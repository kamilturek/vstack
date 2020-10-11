import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { baseUrl } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${baseUrl}/api/notifications`);
  }

  patch(notification: Partial<Notification> & { id: number }): Observable<Notification> {
    return this.http.patch<Notification>(`${baseUrl}/api/notifications/${notification.id}/`, notification);
  }

  delete(notification: { id: number }): Observable<null> {
    return this.http.delete<null>(`${baseUrl}/api/notifications/${notification.id}/`);
  }
}
