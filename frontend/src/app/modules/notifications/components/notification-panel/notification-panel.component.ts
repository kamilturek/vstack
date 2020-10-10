import { Component, OnInit } from '@angular/core';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationStore } from '@app/modules/notifications/stores/notification.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent implements OnInit {

  notifications$: Observable<Notification[]>;

  constructor(private notificationStore: NotificationStore) { }

  ngOnInit(): void {
    this.notifications$ = this.notificationStore.notifications$;
  }

}
