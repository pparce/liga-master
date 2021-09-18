import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamsAddComponent } from './teams-add/teams-add.component';
import { TeamsFormComponent } from './teams-form/teams-form.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        TeamsListComponent,
        TeamsAddComponent,
        TeamsFormComponent,
        TeamsEditComponent,
    ],
    imports: [
        CommonModule,
        TeamsRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class TeamsModule { }
