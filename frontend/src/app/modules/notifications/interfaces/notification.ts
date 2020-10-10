export type NotificationType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

export interface Notification {
    actor: number;
    content: string;
    created: Date;
    type: NotificationType;
    read: boolean;
}
