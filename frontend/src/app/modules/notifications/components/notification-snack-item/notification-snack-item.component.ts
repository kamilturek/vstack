import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationModel } from '@app/modules/notifications/models/notification-model';

@Component({
  selector: 'app-notification-snack-item',
  templateUrl: './notification-snack-item.component.html',
  styleUrls: ['./notification-snack-item.component.scss']
})
export class NotificationSnackItemComponent {
  notification: NotificationModel;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Notification,
    private snackRef: MatSnackBarRef<NotificationSnackItemComponent>
  ) {
    this.notification = new NotificationModel(data);
  }

  onClick(): void {
    this.snackRef.dismiss();
  }
}
