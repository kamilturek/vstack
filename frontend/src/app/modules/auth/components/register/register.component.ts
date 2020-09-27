import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { switchMapTo } from 'rxjs/operators';
import { passwordMismatchValidator } from '@app/modules/settings/components/password-settings/password-settings.component';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required)
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
                if (error.status === 400 && error.error['email']) {
                    this.snackBarService.open('Provided email has been already registered.');
                } else {
                    this.snackBarService.open('Something went wrong.');
                }
            }
        );
    }
}
