import { Component, OnInit } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';
import { ImageService } from '@app/modules/images/services/images.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
    images$: Observable<Image[]>;

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.images$ = this.imageService.getImages();
    }
}
