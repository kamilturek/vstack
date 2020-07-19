import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required])
    });

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.registerForm.valid) {

        } else {
            this.snackBar.open('Please provide all required credentials.', 'Hide');
        }
    }
}
