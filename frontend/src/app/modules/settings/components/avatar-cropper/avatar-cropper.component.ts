import { Component, Inject, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
    selector: 'app-avatar-cropper',
    templateUrl: './avatar-cropper.component.html',
    styleUrls: []
})
export class AvatarCropperComponent {
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

    imageChangedEvent: any;
    croppedImage: any = '';

    constructor(
        private snackBar: SnackBarService,
        @Inject(MAT_DIALOG_DATA) data: { imageChangedEvent: any}
    ) {
        this.imageChangedEvent = data.imageChangedEvent;
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }

    loadImageFailed(): void {
        this.snackBar.open('Loading image failed.');
    }
}
