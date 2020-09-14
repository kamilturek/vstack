import { Image } from '@app/modules/images/interfaces/image';

export interface Instance {
    id: number;
    name: string;
    container_id: string;
    image: Image;
}
