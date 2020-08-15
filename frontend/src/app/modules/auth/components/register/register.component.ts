import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { switchMapTo } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required])
    }, { validators: passwordMismatchValidator });

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private snackBarService: SnackBarService
    ) { }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.register();
        } else if (this.registerForm.errors && this.registerForm.errors['passwordMismatch']) {
            this.snackBarService.open('Provided passwords are not the same.');
        } else {
            this.snackBarService.open('Please provide all required credentials.');
        }
    }

    private register(): void {
        this.userService.register(this.registerForm.value).pipe(
            switchMapTo(this.authService.login(this.registerForm.value))
        ).subscribe(
            () => this.snackBarService.open('Registered successfully.'),
            (error: HttpErrorResponse) => {
                if (error.status === 400 && error.error['username']) {
                    this.snackBarService.open('Provided username already exists.');
                } else {
                    this.snackBarService.open('Something went wrong.');
                }
            }
        );
    }
}

export const passwordMismatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const passwordConfirmation = control.get('passwordConfirmation').value;

    return password !== passwordConfirmation ? { passwordMismatch: true } : null;
};
