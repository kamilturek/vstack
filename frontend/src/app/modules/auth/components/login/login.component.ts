import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) { }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value);
        } else {
            this.snackBar.open('Please provide all required credentials.', 'Hide');
        }
    }
}
