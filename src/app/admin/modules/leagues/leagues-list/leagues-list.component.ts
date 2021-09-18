import { Router } from '@angular/router';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { League } from './../../../../shared/models/league';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/shared/models/teams';

@Component({
    selector: 'app-leagues-list',
    templateUrl: './leagues-list.component.html',
    styleUrls: ['./leagues-list.component.scss']
})
export class LeaguesListComponent implements OnInit {
    leagues: League[] = [];
    teams: Team[] = [];
    loading: boolean = false;
    delTargetId: string;
    selectedLeague: League = {};

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getTeams();
        this.getLeagues();
    }

    getTeams(): void {
        this.loading = true;
        this.connectionService.get(ConnectionService.TEAMS).subscribe(
            (response: any[]) => {
                if (response.length) {
                    this.teams = response.map(e => {
                        return {
                            id: e['id'],
                            name: e['Nombre del equipo'],
                            logo: e['Logo del Equipo'],
                            league: e['Liga'],
                        };
                    }).reverse();
                    
                } else {
                    this.loading = false;
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando las ligas');
            }
        );
    }

    getLeagues(): void {
        this.connectionService.get(ConnectionService.LEAGUES).subscribe(
            (response: any[]) => {
                this.loading = false;
                if (response.length) {
                    this.leagues = response.map(function (e) {
                        return {
                            id: e['Identificador'],
                            name: e['Nombre De La Liga'],
                            image: e['Logo de la Liga'],
                        };
                    });
                } else {
                    this.loading = false;
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
        let url = ConnectionService.LEAGUES + this.delTargetId;
        this.connectionService.delete(url).subscribe(
            (response: any) => {
                if (response.id) {
                } else {
                    this.toastService.error(response.detail);
                }
                this.getLeagues();
            },
            (error: any) => {
                this.toastService.error(error);
            }
        );
    }

    selectLeague(league: League): void {
        this.selectedLeague = league;
        this.selectedLeague.teams = this.teams.filter(element => element.league == league.id);
    }

}
