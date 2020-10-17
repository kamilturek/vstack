import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/auth.service';
import { baseUrl } from '@environment/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Notification } from '@app/modules/notifications/interfaces/notification';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackItemComponent } from '@app/modules/notifications/components/notification-snack-item/notification-snack-item.component';
import { NotificationStore } from '@app/modules/notifications/stores/notification.store';
import { InstanceStore } from '@app/modules/instances/stores/instance.store';

@Injectable({
  providedIn: 'root'
})
export class NewNotificationService {

  private socket$: WebSocketSubject<Notification | { token: string }>;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private notificationStore: NotificationStore,
    private instanceStore: InstanceStore
  ) {
  }

  public connect(): void {
    if (!this.socket$) {
      this.socket$ = this.getNewWebSocket();
      this.authenticate();
      this.socket$.subscribe(
        (notification: Notification) => {
          this.notificationStore.refresh();
          this.instanceStore.refresh();
          this.snackBar.openFromComponent(
            NotificationSnackItemComponent,
            {
              data: notification,
              duration: 5000,
            }
          );
        }
      );
    }
  }

  private authenticate(): void {
    this.socket$.next({ token: this.authService.token });
  }

  private getNewWebSocket(): WebSocketSubject<Notification | { token: string }> {
    const url = baseUrl.replace('http', 'ws');
    return webSocket(`${url}/ws/notifications/`);
  }
}
