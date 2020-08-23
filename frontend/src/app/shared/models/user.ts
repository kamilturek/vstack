import { User } from '@shared/interfaces/user';
import { baseUrl } from 'src/environments/environment';

export class UserModel implements User {
    username: string;
    avatar: string

    get avatarUrl(): string {
        return `${baseUrl}/${this.avatar}`;
    }
}