import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstancesCreateComponent } from '@app/modules/instances/components/instances-create/instances-create.component';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceService } from '@app/modules/instances/services/instance.service';
import { InstanceStoreService } from '@app/modules/instances/stores/instance-store.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-instances-management',
  templateUrl: './instances-management.component.html',
  styleUrls: ['./instances-management.component.scss']
})
export class InstancesManagementComponent {

  constructor(
    public instanceStore: InstanceStoreService,
    private instanceService: InstanceService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) { }

  add(): void {
    this.dialog.open(InstancesCreateComponent);
  }

  refresh(): void {
    this.instanceStore.refresh();
  }

  delete(): void {
    const selected = this.instanceStore.selection.selected;
    forkJoin(
      selected.map(
        (instance: Instance) => this.instanceService.delete(instance)
      )
    ).subscribe(
      () => {
        this.instanceStore.refresh();
        this.snackBar.open(
          selected.length > 1 ?
            `Deleted ${selected.length} instances.` :
            `Deleted ${selected[0].name} (${selected[0].container_id}).`
        );
      }
    );
  }
}
