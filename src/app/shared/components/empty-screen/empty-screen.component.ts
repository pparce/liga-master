import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-empty-screen',
    templateUrl: './empty-screen.component.html',
    styleUrls: ['./empty-screen.component.scss']
})
export class EmptyScreenComponent implements OnInit {
    @Input() svg: string;
    @Input() title: string;
    @Input() subtitle: string;

    constructor() { }

    ngOnInit(): void {
    }

}
