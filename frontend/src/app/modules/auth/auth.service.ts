import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { catchError, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private snackBarService: SnackBarService
    ) { }

    get isLoggedIn(): boolean {
        return !!this.token;
    }

    login(credentials: Credentials): Observable<{ token: string }> {
        return this.http.post(`http://localhost:8000/api/auth/`, credentials).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.snackBarService.open('Unable to login with provided credentials.');
                } else {
                    this.snackBarService.open('Something went wrong.');
                }
                return EMPTY;
            }),
            tap((response: { token: string} ) => {
                this.token = response.token;
                this.router.navigateByUrl('/');
            })
        );
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
