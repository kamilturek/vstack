import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material/material.module';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { NotificationSnackItemComponent } from './components/notification-snack-item/notification-snack-item.component';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [
    NotificationIconComponent,
    NotificationPanelComponent,
    NotificationItemComponent,
    NotificationSnackItemComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TimeagoModule,
  ],
  exports: [
    NotificationIconComponent,
  ]
})
export class NotificationsModule { }
