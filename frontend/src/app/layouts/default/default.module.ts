import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { InstancesComponent } from '../../modules/instances/instances.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
    declarations: [
        DefaultComponent,
        DashboardComponent,
        InstancesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatDividerModule,
        MatSidenavModule,
    ]
})
export class DefaultModule { }
