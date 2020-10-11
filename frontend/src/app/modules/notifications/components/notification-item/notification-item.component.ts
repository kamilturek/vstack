import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationModel } from '@app/modules/notifications/models/notification-model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() data: Notification;
  @Output() delete = new EventEmitter();
  @Output() read = new EventEmitter();

  notification: NotificationModel;

  ngOnInit(): void {
    this.notification = new NotificationModel(this.data);
  }

  onDeleteClick(): void {
    this.delete.emit();
  }

  onReadClick(): void {
    this.read.emit();
  }
}
