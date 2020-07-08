import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { InstancesComponent } from '../../modules/instances/instances.component';
import { LoginComponent } from '../../modules/login/login.component';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        DefaultComponent,
        DashboardComponent,
        InstancesComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule,
        SharedModule,
    ]
})
export class DefaultModule { }
