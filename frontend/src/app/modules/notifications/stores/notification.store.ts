import { Injectable } from '@angular/core';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { NotificationService } from '@app/modules/notifications/services/notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {

  readonly notifications$: Observable<Notification[]>;
  private _notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this._notifications$.asObservable();
  }

  refresh(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications: Notification[]) => this._notifications$.next(notifications)
    );
  }
}
