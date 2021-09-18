import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TeamsFormComponent } from '../teams-form/teams-form.component';

@Component({
    selector: 'app-teams-add',
    templateUrl: './teams-add.component.html',
    styleUrls: ['./teams-add.component.scss']
})
export class TeamsAddComponent implements OnInit, AfterViewInit {
    @ViewChild(TeamsFormComponent, { static: false }) formComponent: TeamsFormComponent;
    canSave: boolean = false;

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.formComponent.form.valueChanges.subscribe((result) => {
            this.canSave = this.formComponent.form.valid;
        });
    }

    addTeam(): void {
        this.connectionService.post(ConnectionService.TEAMS, this.formComponent.buildJSON()).subscribe(
            (response: any) => {
                if (response.id) {
                    this.toastService.success('Se ha creado el equipo satisfactoriamente');
                    this.connectionService.back();
                } else {
                    this.toastService.error(response.detail);
                }
            },
            (error: any) => {
                this.toastService.error(error);
            }
        );
    }

}
