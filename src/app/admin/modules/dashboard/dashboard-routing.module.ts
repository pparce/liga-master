import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

const routes: Routes = [
    {
        path: '', component: DashboardListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
