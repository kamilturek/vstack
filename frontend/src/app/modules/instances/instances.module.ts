import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstancesComponent } from './components/instances/instances.component';
import { InstancesTableComponent } from './components/instances-table/instances-table.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { InstancesFilterComponent } from './components/instances-filter/instances-filter.component';
import { FormsModule } from '@angular/forms';
import { InstancesManagementComponent } from './components/instances-management/instances-management.component';



@NgModule({
    declarations: [
        InstancesComponent,
        InstancesTableComponent,
        InstancesFilterComponent,
        InstancesManagementComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ]
})
export class InstancesModule { }
