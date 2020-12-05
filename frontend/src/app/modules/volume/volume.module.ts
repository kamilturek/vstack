import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumesComponent } from './components/volumes/volumes.component';
import { VolumesTableComponent } from './components/volumes-table/volumes-table.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { VolumesFilterComponent } from './components/volumes-filter/volumes-filter.component';
import { FormsModule } from '@angular/forms';
import { VolumesManagementComponent } from './components/volumes-management/volumes-management.component';



@NgModule({
  declarations: [
    VolumesComponent,
    VolumesTableComponent,
    VolumesFilterComponent,
    VolumesManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ]
})
export class VolumeModule { }
