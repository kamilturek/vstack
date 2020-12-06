import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumesComponent } from './components/volumes/volumes.component';
import { VolumesTableComponent } from './components/volumes-table/volumes-table.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { VolumesFilterComponent } from './components/volumes-filter/volumes-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolumesManagementComponent } from './components/volumes-management/volumes-management.component';
import { VolumeCreateComponent } from './components/volume-create/volume-create.component';
import { VolumePickerComponent } from './components/volume-picker/volume-picker.component';



@NgModule({
  declarations: [
    VolumesComponent,
    VolumesTableComponent,
    VolumesFilterComponent,
    VolumesManagementComponent,
    VolumeCreateComponent,
    VolumePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    VolumePickerComponent,
  ]
})
export class VolumeModule { }
