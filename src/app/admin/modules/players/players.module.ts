import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersFormComponent } from './players-form/players-form.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayersAddComponent } from './players-add/players-add.component';
import { PlayersEditComponent } from './players-edit/players-edit.component';


@NgModule({
    declarations: [

        PlayersFormComponent,
        PlayersListComponent,
        PlayersAddComponent,
        PlayersEditComponent
    ],
    imports: [
        CommonModule,
        PlayersRoutingModule,
        FormsModule,
        SharedModule,
    ]
})
export class PlayersModule { }
