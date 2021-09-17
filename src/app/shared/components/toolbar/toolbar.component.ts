

import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() icon: string;
    @Input() back: boolean;

    constructor(
        private _location: Location,
    ) {
        this.buildBreadCrumbLabels();
    }

    ngOnInit(): void {

    }


    buildBreadCrumbLabels() {
        /*  this.breadcrumbService.set('admin', 'Incio');
         this.breadcrumbService.set('admin/dashboard', 'Estadísticas');
         this.breadcrumbService.set('admin/corporations', 'Corporaciones');
         this.breadcrumbService.set('admin/corporations/add', 'Agregar');
         this.breadcrumbService.set('admin', 'Incio');
         this.breadcrumbService.set('admin', 'Incio');
         this.breadcrumbService.set('admin', 'Incio');
         this.breadcrumbService.set('admin', 'Incio'); */
    }

    onBackPress() {
        this._location.back();
    }

}
