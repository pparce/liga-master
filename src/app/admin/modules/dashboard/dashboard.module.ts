import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { SharedModule } from './../../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        DashboardListComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule

    ]
})
export class DashboardModule { }
