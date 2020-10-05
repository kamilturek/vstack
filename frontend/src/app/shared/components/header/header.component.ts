import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { NotificationService } from '@app/modules/notifications/services/notification.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output() toggleSideBar: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }

    logout(): void {
        this.authService.logout();
    }

    toggle(): void {
        this.toggleSideBar.emit();
    }
}
