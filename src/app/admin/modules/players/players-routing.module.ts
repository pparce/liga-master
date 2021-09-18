import { PlayersEditComponent } from './players-edit/players-edit.component';
import { PlayersAddComponent } from './players-add/players-add.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: PlayersListComponent,
    },
    {
        path: 'add',
        component: PlayersAddComponent,
    },
    {
        path: 'edit/:id',
        component: PlayersEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayersRoutingModule { }
