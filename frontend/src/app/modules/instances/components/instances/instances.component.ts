import { Component } from '@angular/core';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent {
  filter: string;

  onFilterInput(value: string): void {
    this.filter = value;
  }
}
