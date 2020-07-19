import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.authService.token}`
                }
            });
        }
        
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.catchUnauthenticated();
                }

                return throwError(error);
            })
        );
    }

    private catchUnauthenticated(): void {
        this.router.navigateByUrl('/login');
        this.snackBar.open('Please login.', 'Hide', { duration: 3000 });
    }
}
