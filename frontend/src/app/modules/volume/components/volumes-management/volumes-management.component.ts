import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationStore } from '@app/modules/notifications/stores/notification.store';
import { VolumeCreateComponent } from '@app/modules/volume/components/volume-create/volume-create.component';
import { Volume } from '@app/modules/volume/interfaces/volume';
import { VolumeService } from '@app/modules/volume/services/volume.service';
import { VolumeStore } from '@app/modules/volume/stores/volume.store';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-volumes-management',
  templateUrl: './volumes-management.component.html',
  styleUrls: ['./volumes-management.component.scss']
})
export class VolumesManagementComponent implements OnInit {

  constructor(
    public volumeStore: VolumeStore,
    private volumeService: VolumeService,
    private notificationStore: NotificationStore,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  add(): void {
    const dialogRef = this.dialog.open(VolumeCreateComponent);
    dialogRef.afterClosed().pipe(
      filter(Boolean),
    ).subscribe(
      (result: { refresh?: boolean }) => {
        if (result.refresh) {
          this.refresh();
        }
      }
    );
  }

  refresh(): void {
    this.volumeStore.refresh();
  }

  delete(): void {
    const selected = this.volumeStore.selection.selected;
    forkJoin(
      selected.map(
        (volume: Volume) => this.volumeService.delete(volume)
      )
    ).subscribe(
      () => {
        this.volumeStore.refresh();
        this.notificationStore.refresh(); // Temporary
        this.snackBar.open(
          selected.length > 1 ?
          `Deleted ${selected.length} volumes.` :
          `Deleted ${selected[0].name}.`
        );
      }
    );
  }
}
