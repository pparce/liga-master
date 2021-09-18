
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
    loading: boolean = false;
    delTargetId: string;
    selectedPlayer: Player = {};

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
                this.loading = false;
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
                    this.toastService.error('Ha ocurrido un error cargando los jugadores');
                }
            },
            (error: any) => {
                this.loading = false;
                this.toastService.error('Ha ocurrido un error cargando los jugadores');
            }
        );
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

}
