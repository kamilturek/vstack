import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMismatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const passwordConfirmation = control.get('passwordConfirmation').value;

    return password !== passwordConfirmation ? { passwordMismatch: true } : null;
};
