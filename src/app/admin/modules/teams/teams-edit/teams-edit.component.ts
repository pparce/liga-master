import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from './../../../../shared/services/connection.service';
import { TeamsFormComponent } from './../teams-form/teams-form.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-teams-edit',
    templateUrl: './teams-edit.component.html',
    styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit, AfterViewInit {
    @ViewChild(TeamsFormComponent, { static: false }) formComponent: TeamsFormComponent;
    canSave: boolean = false;
    id: string;

    constructor(
        private connectionService: ConnectionService,
        private toastService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        this.getTeam();
    }

    ngAfterViewInit(): void {
        this.formComponent.form.valueChanges.subscribe((result) => {
            this.canSave = this.formComponent.form.valid;
        });
    }

    getTeam(): void {
        let url = ConnectionService.TEAMS + this.id;
        this.connectionService.get(url).subscribe(
            (response: any) => {
                if (response.id) {
                    this.formComponent.team = {
                        id: response['id'],
                        name: response['Nombre del equipo'],
                        logo: response['Logo del Equipo'],
                        league: response['Liga']
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

    editTeam(): void {
        let url = ConnectionService.TEAMS + this.id;
        this.connectionService.put(url, this.formComponent.buildJSON()).subscribe(
            (response: any) => {
                if (response.id) {
                    this.toastService.success('El equipo se ha editado satisfactoriamente');
                    this.connectionService.back();
                } else {
                    this.toastService.error('Ha ocurrido un problema editando el equipo');

                }
            },
            (error: any) => {
                this.toastService.error('Ha ocurrido un problema editando el equipo');
            }
        );
    }

}
