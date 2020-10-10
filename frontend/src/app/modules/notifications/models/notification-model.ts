import { Notification, NotificationType } from '@app/modules/notifications/interfaces/notification';

export class NotificationModel {
  public content: string;
  public created: string;
  private type: NotificationType;

  constructor(notification: Notification) {
    Object.assign(this, notification);
  }

  get icon(): string {
    return this.iconMapping[this.type];
  }

  get color(): string {
    return this.colorMapping[this.type];
  }

  private readonly iconMapping: { [type in NotificationType]: string } = {
    SUCCESS: 'check_circle',
    INFO: 'info',
    WARNING: 'error',
    ERROR: 'cancel',
  };

  private readonly colorMapping: { [type in NotificationType]: string } = {
    SUCCESS: '#5cb85c',
    INFO: '#0275d8',
    WARNING: '#f0ad4e',
    ERROR: '#d9534f',
  };
}
