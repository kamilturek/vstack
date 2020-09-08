import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './components/images/images.component';
import { MaterialModule } from '@app/modules/material/material.module';



@NgModule({
    declarations: [ImagesComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ]
})
export class ImagesModule { }
