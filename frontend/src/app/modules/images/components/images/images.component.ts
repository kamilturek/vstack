import { Component, OnInit } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';
import { ImageService } from '@app/modules/images/services/images.service';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
    imageName: string;
    filteredImages: Image[];
    private images: Image[];

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.imageService.getImages().subscribe((images: Image[]) => {
            this.images = images;
            this.filteredImages = images;
        });
    }

    onSearchValueChanged(name: string): void {
        this.filteredImages = this.images.filter(
            (image: Image) => image.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}
