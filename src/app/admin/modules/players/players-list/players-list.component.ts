import { Team } from 'src/app/shared/models/teams';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/players';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
    players: Player[] = [];
    playersAuxSearch: Player[] = [];
    teams: Team[] = [];
    loading: boolean = false;
    delTargetId: string;
    selectedPlayer: Player = {};
    searchWord: string = '';

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getTeams();
    }

    getTeams(): void {
        this.loading = true;
        this.connectionService.get(ConnectionService.TEAMS).subscribe(
            (response: any) => {
                // this.loading = false;
                if (response.body.length) {
                    this.teams = response.body.map(function (e) {
                        return {
                            id: e['id'],
                            name: e['Nombre del equipo'],
                            logo: e['Logo del Equipo'],
                            league: e['Liga'],
                        };
                    }).reverse();
                    this.getPlayers();
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los equipos');
            }
        );
    }

    getPlayers(): void {
        this.connectionService.get(ConnectionService.PLAYERS).subscribe(
            (response: any) => {
                this.loading = false;
                if (response.body.length) {
                    this.players = response.body.map((e) => {
                        return {
                            id: e['id'],
                            name: e['Nombre del Jugador'],
                            avatar: e['Avatar'],
                            team: this.getTeamNameById(e['teamId']),
                        };
                    }).reverse();
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los jugadores');
            }
        );
    }

    getTeamNameById(id: string): string {
        return this.teams[this.teams.map(e => e.id).indexOf(id)].name;
    }

    deleteTarget(id: string) {
        this.delTargetId = id;
    }

    deleteLeague(): void {
        let url = ConnectionService.PLAYERS + this.delTargetId;
        this.connectionService.delete(url).subscribe(
            (response: any) => {
                this.toastService.success('El jugador se ha eliminado satisfactoriamente');
                this.getPlayers();
            },
            (error: any) => {
                this.toastService.error(error);
            }
        );
    }

    selectPlayer(player: Player) {
        this.selectedPlayer = player;
    }  

    filterSearch() {
        this.playersAuxSearch = this.players.filter(element =>
            element.name.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1
            || element.team.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1);
    }

}
