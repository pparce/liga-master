import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
    selector: 'app-scroll-view',
    templateUrl: './scroll-view.component.html',
    styleUrls: ['./scroll-view.component.scss']
})
export class ScrollViewComponent implements OnInit {
    @Input() heightStatic = 195;
    public screenWidth: any;
    public screenHeight: any;
    // heightStatic = 195;


    constructor() { }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight - this.heightStatic;
        // console.log(this.screenHeight + '  ' + this.screenWidth);

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight - this.heightStatic;
    }
}
