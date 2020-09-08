import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './components/images/images.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { ImagesListComponent } from './components/images-list/images-list.component';
import { FormsModule } from '@angular/forms';
import { ImageCardComponent } from './components/image-card/image-card.component';



@NgModule({
    declarations: [
        ImagesComponent,
        ImageCardComponent,
        ImagesListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ]
})
export class ImagesModule { }
