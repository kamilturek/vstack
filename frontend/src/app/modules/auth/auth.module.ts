import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule,
    ]
})
export class AuthModule { }
