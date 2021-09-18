import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { League } from './../../../../shared/models/league';
import { Team } from './../../../../shared/models/teams';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-teams-form',
    templateUrl: './teams-form.component.html',
    styleUrls: ['./teams-form.component.scss']
})
export class TeamsFormComponent implements OnInit {
    @ViewChild('form', { static: false }) form: NgForm;
    team: Team = {};
    leagues: League[] = [];

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        this.getLeagues();
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
                } else {
                    this.toastService.error('Ha ocurrido un error cargando las ligas');
                }
            },
            (error: any) => {
                this.toastService.error('Ha ocurrido un error cargando las ligas');
            }
        );
    }

    buildJSON(): object {
        return {
            "Nombre del equipo": this.team.name,
            "Logo del Equipo": "https://robohash.org/velitfugitiure.png?size=250x250&set=set1",
            "Liga": this.team.league
        }
    }


}
