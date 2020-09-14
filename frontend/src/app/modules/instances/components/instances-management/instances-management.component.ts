import { Component } from '@angular/core';
import { InstanceStoreService } from '@app/modules/instances/stores/instance-store.service';

@Component({
  selector: 'app-instances-management',
  templateUrl: './instances-management.component.html',
  styleUrls: ['./instances-management.component.scss']
})
export class InstancesManagementComponent {

  constructor(private instanceStore: InstanceStoreService) { }

  refresh(): void {
    this.instanceStore.refresh();
  }
}
