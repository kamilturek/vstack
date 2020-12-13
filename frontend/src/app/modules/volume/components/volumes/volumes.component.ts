import { Component } from '@angular/core';

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss']
})
export class VolumesComponent {
  filter: string;

  onFilterInput(value: string): void {
    this.filter = value;
  }
}
