import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/auth.service';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private authService: AuthService) {
    const subject = webSocket(`ws://localhost:8000/ws/notifications/`);
    subject.subscribe(console.log);
    subject.next({'token': authService.token});
  }
}
