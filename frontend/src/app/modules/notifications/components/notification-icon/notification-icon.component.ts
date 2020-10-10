import { Component, OnInit } from '@angular/core';
import { NotificationStore } from '@app/modules/notifications/stores/notification.store';
import { Observable } from 'rxjs';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { map, shareReplay } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NotificationPanelComponent } from '@app/modules/notifications/components/notification-panel/notification-panel.component';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss']
})
export class NotificationIconComponent implements OnInit {

  count$: Observable<number>;

  constructor(
    private notificationStore: NotificationStore,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.count$ = this.notificationStore.notifications$.pipe(
      map(
        (notifications: Notification[]) => notifications.filter(
          (notification: Notification) => !notification.read
        ).length
      ),
      shareReplay(1),
    );
    this.notificationStore.refresh();
  }

  openPanel(): void {
    this.bottomSheet.open(NotificationPanelComponent);
  }
}
