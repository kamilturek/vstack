import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstancesCreateComponent } from '@app/modules/instances/components/instances-create/instances-create.component';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceService } from '@app/modules/instances/services/instance.service';
import { InstanceStore } from '@app/modules/instances/stores/instance.store';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-instances-management',
  templateUrl: './instances-management.component.html',
  styleUrls: ['./instances-management.component.scss']
})
export class InstancesManagementComponent {

  constructor(
    public instanceStore: InstanceStore,
    private instanceService: InstanceService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) { }

  add(): void {
    const dialogRef = this.dialog.open(InstancesCreateComponent);
    dialogRef.afterClosed().subscribe(
      (result: { refresh?: boolean }) => {
        if (result.refresh) {
          this.refresh();
        }
      }
    );
  }

  refresh(): void {
    this.instanceStore.refresh();
  }

  start(): void {
    const selected = this.instanceStore.selection.selected;
    forkJoin(
      selected.map(
        (instance: Instance) => this.instanceService.start(instance)
      )
    ).subscribe(
      () => {
        this.instanceStore.refresh();
        this.snackBar.open(
          selected.length > 1 ?
            `Started ${selected.length} instances.` :
            `Started ${selected[0].name}.`
        );
      }
    );
  }

  restart(): void {
    const selected = this.instanceStore.selection.selected;
    forkJoin(
      selected.map(
        (instance: Instance) => this.instanceService.restart(instance)
      )
    ).subscribe(
      () => {
        this.instanceStore.refresh();
        this.snackBar.open(
          selected.length > 1 ?
            `Restarted ${selected.length} instances.` :
            `Restarted ${selected[0].name}.`
        );
      }
    );
  }

  stop(): void {
    const selected = this.instanceStore.selection.selected;
    forkJoin(
      selected.map(
        (instance: Instance) => this.instanceService.stop(instance)
      )
    ).subscribe(
      () => {
        this.instanceStore.refresh();
        this.snackBar.open(
          selected.length > 1 ?
            `Stopped ${selected.length} instances.` :
            `Stopped ${selected[0].name}.`
        );
      }
    );
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
            `Deleted ${selected[0].name}.`
        );
      }
    );
  }
}
