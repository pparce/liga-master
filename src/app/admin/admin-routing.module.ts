import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'leagues',
                loadChildren: () => import('./modules/leagues/leagues.module').then(m => m.LeaguesModule),
            },
            {
                path: 'teams',
                loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule),
            },
            {
                path: 'players',
                loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
