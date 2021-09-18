import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { PlayersFormComponent } from './../players-form/players-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-players-edit',
    templateUrl: './players-edit.component.html',
    styleUrls: ['./players-edit.component.scss']
})
export class PlayersEditComponent implements OnInit {
    @ViewChild(PlayersFormComponent, { static: false }) formComponent: PlayersFormComponent;
    canSave: boolean = false;
    id: string;

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        this.getPlayer();
    }

    ngAfterViewInit(): void {
        this.formComponent.form.valueChanges.subscribe((result) => {
            this.canSave = this.formComponent.form.valid;
        });
    }

    getPlayer(): void {
        let url = ConnectionService.PLAYERS + this.id;
        this.connectionService.get(url).subscribe(
            (response: any) => {
                if (response.id) {
                    this.formComponent.player = {
                        id: response['id'],
                        name: response['Nombre del Jugador'],
                        avatar: response['Avatar'],
                        team: response['teamId']
                    };
                } else {
                    this.toastService.error(response.detail);
                }
            },
            (error: any) => {
                this.toastService.error(error);
            }
        );
    }

    editPlayer(): void {
        let url = ConnectionService.PLAYERS + this.id;
        this.connectionService.put(url, this.formComponent.buildJSON()).subscribe(
            (response: any) => {
                if (response.id) {
                    this.toastService.success('El jugador se ha editado satisfactoriamente');
                    this.connectionService.back();
                } else {
                    this.toastService.error('Ha ocurrido un problema editando el jugador');
                }
            },
            (error: any) => {
                this.toastService.error('Ha ocurrido un problema editando el jugador');
            }
        );
    }
}