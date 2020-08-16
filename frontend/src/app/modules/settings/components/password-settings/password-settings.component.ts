import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UserService } from '@shared/services/user.service';
import { pluck, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-password-settings',
    templateUrl: './password-settings.component.html',
    styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent {

    passwordForm = new FormGroup({
        currentPassword: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required)
    });

    constructor(
        private snackBarService: SnackBarService,
        private userService: UserService
    ) { }

    onSubmit(): void {
        if (this.passwordForm.valid) {
            this.changePassword();
        } else if (this.passwordForm.errors && this.passwordForm.errors['passwordMismatch']) {
            this.snackBarService.open('Provided passwords are not the same.');
        } else {
            this.snackBarService.open('Please provide all required credentials.');
        }
    }

    private changePassword(): void {
        this.userService.getCurrentUser().pipe(
            pluck('id'),
            switchMap((id: number) => this.userService.setPassword(id, this.passwordForm.value))
        ).subscribe(
            (response: string) => {
                this.snackBarService.open(response);
                this.passwordForm.reset();
            },
            (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.snackBarService.open(Object.values(error.error)[0] as string);
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
