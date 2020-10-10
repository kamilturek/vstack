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
    this.notificationService.getNotifications().subscribe(
      (notifications: Notification[]) => this.notificationsList$.next(notifications)
    );
  }
}
