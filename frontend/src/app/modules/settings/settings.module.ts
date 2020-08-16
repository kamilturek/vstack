import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { PasswordSettingsComponent } from './components/password-settings/password-settings.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [SettingsComponent, PasswordSettingsComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class SettingsModule { }
