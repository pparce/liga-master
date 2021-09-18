import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { PlayersFormComponent } from './../players-form/players-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-players-add',
    templateUrl: './players-add.component.html',
    styleUrls: ['./players-add.component.scss']
})
export class PlayersAddComponent implements OnInit {
    @ViewChild(PlayersFormComponent, { static: false }) formComponent: PlayersFormComponent;
    canSave: boolean = false;

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.formComponent.form.valueChanges.subscribe((result) => {
            this.canSave = this.formComponent.form.valid;
        });
    }

    addTeam(): void {
        this.connectionService.post(ConnectionService.PLAYERS, this.formComponent.buildJSON()).subscribe(
            (response: any) => {
                if (response.id) {
                    this.toastService.success('Se ha creado el jugador satisfactoriamente');
                    this.connectionService.back();
                } else {
                    this.toastService.error('Ha ocurrido un problema creando el jugador');
                }
            },
            (error: any) => {
                this.toastService.error('Ha ocurrido un problema creando el jugador');
            }
        );
    }

}
