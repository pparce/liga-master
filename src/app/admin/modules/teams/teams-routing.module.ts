import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { TeamsAddComponent } from './teams-add/teams-add.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: TeamsListComponent,
    },
    {
        path: 'add',
        component: TeamsAddComponent,
    },
    {
        path: 'edit/:id',
        component: TeamsEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamsRoutingModule { }
