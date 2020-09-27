import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => this.snackBarService.open('Logged in successfully.')
      );
    } else {
      this.snackBarService.open('Please provide all required credentials.');
    }
  }
}
