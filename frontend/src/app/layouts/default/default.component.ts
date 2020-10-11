import { Component, OnInit } from '@angular/core';
import { NewNotificationService } from '@app/modules/notifications/services/new-notification.service';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

    sideBarOpen = true;

    constructor(private newNotificationService: NewNotificationService) {
        this.newNotificationService.connect();
    }

    ngOnInit(): void {
    }

    toggleSideBar(): void {
        this.sideBarOpen = !this.sideBarOpen;
    }
}
