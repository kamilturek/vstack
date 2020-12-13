import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-volumes-filter',
  templateUrl: './volumes-filter.component.html',
  styleUrls: ['./volumes-filter.component.scss']
})
export class VolumesFilterComponent {
  data: string;
  @Output() filterInput = new EventEmitter<string>();

  onNgModelChange(value: string): void {
    this.filterInput.emit(value);
  }
}
