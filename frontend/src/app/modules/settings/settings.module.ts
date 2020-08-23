import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { PasswordSettingsComponent } from './components/password-settings/password-settings.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarSettingsComponent } from './components/avatar-settings/avatar-settings.component';
import { AvatarCropperComponent } from './components/avatar-cropper/avatar-cropper.component';



@NgModule({
    declarations: [
        SettingsComponent,
        PasswordSettingsComponent,
        AvatarSettingsComponent,
        AvatarCropperComponent,
    ],
    imports: [
        CommonModule,
        ImageCropperModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class SettingsModule { }
