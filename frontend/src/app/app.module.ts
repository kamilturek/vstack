import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ImagesModule } from './modules/images/images.module';
import { InstancesModule } from './modules/instances/instances.module';
import { SharedModule } from './shared/shared.module';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DefaultModule,
        ImagesModule,
        InstancesModule,
        SharedModule,
        TimeagoModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
