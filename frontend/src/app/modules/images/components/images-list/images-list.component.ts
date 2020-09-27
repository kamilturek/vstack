import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent {
  @Input() images: Image[];
  @Output() imageClick = new EventEmitter<Image>();

  onImageClick(image: Image): void {
    this.imageClick.emit(image);
  }
}
