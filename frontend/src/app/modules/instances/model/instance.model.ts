import { Image } from '@app/modules/images/interfaces/image';
import { NewInstance } from '@app/modules/instances/interfaces/instance';

export class InstanceModel {
  constructor(
    private name: string,
    private image: Image,
  ) { }

  get data(): NewInstance {
    return {
      name: this.name,
      image: this.image.id,
    };
  }
}
