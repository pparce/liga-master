import { Player } from './../../../../shared/models/players';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/teams';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
    teams: Team[] = [];
    players: Player[] = [];
    loading: boolean = false;
    delTargetId: string;
    selectedTeam: Team = {};

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getPlayers();
    }

    getPlayers(): void {
        this.loading = true;
        this.connectionService.get(ConnectionService.PLAYERS).subscribe(
            (response: any[]) => {
                // this.loading = false;
                if (response.length) {
                    this.players = response.map(function (e) {
                        return {
                            id: e['id'],
                            name: e['Nombre del Jugador'],
                            avatar: e['Avatar'],
                            team: e['teamId']
                        };
                    }).reverse();
                    this.getTeams();
                } else {
                    this.toastService.error('Ha ocurrido un error cargando los jugadores');
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los jugadores');
            }
        );
    }

    getTeams(): void {
        this.connectionService.get(ConnectionService.TEAMS).subscribe(
            (response: any[]) => {
                this.loading = false;
                if (response.length) {
                    this.teams = response.map(function (e) {
                        return {
                            id: e['id'],
                            name: e['Nombre del equipo'],
                            logo: e['Logo del Equipo'],
                            league: e['Liga'],
                        };
                    }).reverse();
                } else {
                    this.toastService.error('Ha ocurrido un error cargando las ligas');
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando las ligas');
            }
        );
    }

    deleteTarget(id: string) {
        this.delTargetId = id;
    }

    deleteLeague(): void {
        let url = ConnectionService.TEAMS + this.delTargetId;
        this.connectionService.delete(url).subscribe(
            (response: any) => {
                this.toastService.success('El equipo se ha eliminado satisfactoriamente');
                this.getTeams();
            },
            (error: any) => {
                this.toastService.error(error);
            }
        );
    }

    selectTeam(team: Team) {
        this.selectedTeam = team;
        this.selectedTeam.players = this.players.filter(element => element.team == team.id);
    }

}
