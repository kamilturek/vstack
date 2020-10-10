import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationModel } from '@app/modules/notifications/models/notification-model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() data: Notification;

  notification: NotificationModel;

  ngOnInit(): void {
    this.notification = new NotificationModel(this.data);
  }
}
