import { Component, Input } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
    @Input() image: Image;
}
