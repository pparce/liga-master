import { Team } from 'src/app/shared/models/teams';
import { Player } from './../../../../shared/models/players';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-players-form',
    templateUrl: './players-form.component.html',
    styleUrls: ['./players-form.component.scss']
})
export class PlayersFormComponent implements OnInit {
    @ViewChild('form', { static: false }) form: NgForm;
    player: Player = {};
    teams: Team[] = [];

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
    ) {

    }

    ngOnInit(): void {
        this.getTeams();
    }

    getTeams(): void {
        this.connectionService.get(ConnectionService.TEAMS).subscribe(
            (response: any[]) => {
                if (response.length) {
                    this.teams = response.map(function (e) {
                        return {
                            id: e['id'],
                            name: e['Nombre del equipo'],
                            logo: e['Logo del Equipo'],
                            league: e['Liga']
                        };
                    }).reverse();
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
            "Nombre del Jugador": this.player.name,
            "Avatar": "https://robohash.org/velitfugitiure.png?size=250x250&set=set1",
            "teamId": this.player.team
        }
    }


}
