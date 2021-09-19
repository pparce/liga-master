
import { LoadingComponent } from './components/loading/loading.component';
import { ScrollViewComponent } from './components/scroll-view/scroll-view.component';
import { ContainerComponent } from './components/container/container.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EmptyScreenComponent } from './components/empty-screen/empty-screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        EmptyScreenComponent,
        ToolbarComponent,
        ContainerComponent,
        ScrollViewComponent,
        LoadingComponent,
    ],
    exports: [
        EmptyScreenComponent,
        ToolbarComponent,
        ContainerComponent,
        ScrollViewComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
