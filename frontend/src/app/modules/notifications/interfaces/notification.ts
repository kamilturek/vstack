export type NotificationType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

export interface Notification {
    actor: number;
    content: string;
    created: string;
    id: number;
    type: NotificationType;
    read: boolean;
}
