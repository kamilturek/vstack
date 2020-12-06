import { Component, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Volume } from '@app/modules/volume/interfaces/volume';
import { VolumeStore } from '@app/modules/volume/stores/volume.store';

@Component({
  selector: 'app-volume-picker',
  templateUrl: './volume-picker.component.html',
  styleUrls: ['./volume-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: VolumePickerComponent,
      multi: true,
    }
  ]
})
export class VolumePickerComponent implements ControlValueAccessor {
  @ViewChild('volumes', { static: true }) volumes: MatSelectionList;

  constructor(
    public volumeStore: VolumeStore
  ) { }

  writeValue(volumes: Volume[]): void {
    if (this.volumes.options) {
      const volumesOptions = this.volumes.options.filter(
        (item: MatListOption) => volumes.map(
          (volume: Volume) => volume.id
        ).includes(item.value.id)
      );
      this.volumes.selectedOptions.select(...volumesOptions);
    }
  }

  registerOnChange(fn: any): void {
    this.volumes.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.volumes.registerOnTouched(fn);
  }
}
