import { Image } from '@app/modules/images/interfaces/image';
import { NewInstance } from '@app/modules/instances/interfaces/instance';
import { Volume } from '@app/modules/volume/interfaces/volume';

export class InstanceModel {
  constructor(
    private name: string,
    private image: Image,
    private volumes: Volume[],
  ) { }

  get data(): NewInstance {
    return {
      name: this.name,
      image: this.image.id,
      volumes: this.volumes.map((volume: Volume) => volume.id),
    };
  }
}
