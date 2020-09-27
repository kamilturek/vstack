import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Image } from '@app/modules/images/interfaces/image';
import { ImageService } from '@app/modules/images/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Output() imageClick = new EventEmitter<Image>();

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

  onImageClick(image: Image): void {
    this.imageClick.emit(image);
  }

  clearSearchValue(): void {
    this.imageName = '';
    this.onSearchValueChanged(this.imageName);
  }
}
