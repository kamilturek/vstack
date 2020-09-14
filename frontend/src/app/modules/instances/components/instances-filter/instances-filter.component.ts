import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instances-filter',
  templateUrl: './instances-filter.component.html',
  styleUrls: ['./instances-filter.component.scss']
})
export class InstancesFilterComponent {
  data: string;
  @Output() filterInput = new EventEmitter<string>();

  onNgModelChange(value: string): void {
    this.filterInput.emit(value);
  }
}
