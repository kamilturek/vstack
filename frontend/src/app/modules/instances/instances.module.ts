import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstancesComponent } from './components/instances/instances.component';
import { InstancesTableComponent } from './components/instances-table/instances-table.component';
import { MaterialModule } from '@app/modules/material/material.module';



@NgModule({
    declarations: [
        InstancesComponent,
        InstancesTableComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ]
})
export class InstancesModule { }
