import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaguesRoutingModule } from './leagues-routing.module';
import { LeaguesListComponent } from './leagues-list/leagues-list.component';
import { LeaguesFormComponent } from './leagues-form/leagues-form.component';
import { LeaguesAddComponent } from './leagues-add/leagues-add.component';
import { LeaguesEditComponent } from './leagues-edit/leagues-edit.component';


@NgModule({
  declarations: [
    LeaguesListComponent,
    LeaguesFormComponent,
    LeaguesAddComponent,
    LeaguesEditComponent
  ],
  imports: [
    CommonModule,
    LeaguesRoutingModule,
    SharedModule
  ]
})
export class LeaguesModule { }
