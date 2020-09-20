import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstancesComponent } from './components/instances/instances.component';
import { InstancesTableComponent } from './components/instances-table/instances-table.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { InstancesFilterComponent } from './components/instances-filter/instances-filter.component';
import { FormsModule } from '@angular/forms';
import { InstancesManagementComponent } from './components/instances-management/instances-management.component';
import { InstancesCreateComponent } from './components/instances-create/instances-create.component';



@NgModule({
    declarations: [
        InstancesComponent,
        InstancesTableComponent,
        InstancesFilterComponent,
        InstancesManagementComponent,
        InstancesCreateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ]
})
export class InstancesModule { }
