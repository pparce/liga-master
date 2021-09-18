import { League } from './../../../../shared/models/league';
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
    teamsAuxSearch: Team[] = [];
    leagues: League[] = [];
    players: Player[] = [];
    loading: boolean = false;
    delTargetId: string;
    selectedTeam: Team = {};
    searchWord: string = '';

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getPlayers();
        this.getLeagues();
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

                } else {
                    this.loading = false;
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los jugadores');
            }
        );
    }

    getLeagues(): void {
        this.connectionService.get(ConnectionService.LEAGUES).subscribe(
            (response: any[]) => {
                if (response.length) {
                    this.leagues = response.map(function (e) {
                        return {
                            id: e['Identificador'],
                            name: e['Nombre De La Liga'],
                            image: e['Logo de la Liga'],
                        };
                    });
                    this.getTeams();
                } else{
                    this.loading = false;
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando las ligas');
            }
        );
    }

    getTeams(): void {
        this.connectionService.get(ConnectionService.TEAMS).subscribe(
            (response: any[]) => {
                this.loading = false;
                if (response.length) {
                    this.teams = response.map(e => {
                        return {
                            id: e['id'],
                            name: e['Nombre del equipo'],
                            logo: e['Logo del Equipo'],
                            league: this.getLeagueNameById(e['Liga']),
                        };
                    }).reverse();
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los equipos');
            }
        );
    }

    getLeagueNameById(id: string): string {
        return this.leagues[this.leagues.map(e => e.id).indexOf(id)].name;
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

    filterSearch() {
        this.teamsAuxSearch = this.teams.filter(element =>
            element.name.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1
            || element.league.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1);
    }

}
