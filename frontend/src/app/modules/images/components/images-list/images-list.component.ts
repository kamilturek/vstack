import { Component, Input } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent {
    @Input() images: Image[];
}
