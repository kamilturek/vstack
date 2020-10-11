import { Injectable } from '@angular/core';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationService } from '@app/modules/notifications/services/notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {

  readonly notifications$: Observable<Notification[]>;
  private notificationsList$ = new BehaviorSubject<Notification[]>([]);

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationsList$.asObservable();
  }

  refresh(): void {
    this.notificationService.getAll().subscribe(
      (notifications: Notification[]) => this.notificationsList$.next(notifications)
    );
  }

  read(notification: Notification): void {
    this.notificationService.patch({
      id: notification.id,
      read: true,
    }).subscribe(
      () => this.refresh()
    );
  }

  delete(notification: Notification): void {
    this.notificationService.delete(notification).subscribe(
      () => this.refresh()
    );
  }
}
