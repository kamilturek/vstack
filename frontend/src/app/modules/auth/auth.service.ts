import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private snackBar: MatSnackBar,
    ) { }

    get isLoggedIn(): boolean {
        return !!this.token;
    }

    login(credentials: { username: string, password: string }): void {
        this.http.post(`http://localhost:8000/api/auth/`, credentials).subscribe(
            (response: { token: string }) => {
                this.token = response.token;
                this.snackBar.open('Logged in successfully.', 'Hide', { duration: 3000 });
                this.router.navigateByUrl('/');
            },
            (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.snackBar.open('Unable to login with provided credentials.', 'Hide', { duration: 3000 });
                } else {
                    this.snackBar.open('Something went wrong.', 'Hide', { duration: 3000 });
                }
            });
    }

    logout(): void {
        this.removeToken();
        this.router.navigateByUrl('/login');
    }

    removeToken(): void {
        localStorage.removeItem('token');
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }
}
