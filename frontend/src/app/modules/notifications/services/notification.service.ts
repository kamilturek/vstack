import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewNotificationService } from '@app/modules/notifications/services/new-notification.service';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { baseUrl } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private newNotificationService: NewNotificationService
  ) {
    this.newNotificationService.connect();
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${baseUrl}/api/notifications`);
  }
}
