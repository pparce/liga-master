import { LeaguesAddComponent } from './leagues-add/leagues-add.component';
import { LeaguesEditComponent } from './leagues-edit/leagues-edit.component';
import { LeaguesListComponent } from './leagues-list/leagues-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LeaguesListComponent,
    },
    {
        path: 'add',
        component: LeaguesAddComponent,
    },
    {
        path: 'edit/:id',
        component: LeaguesEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeaguesRoutingModule { }
