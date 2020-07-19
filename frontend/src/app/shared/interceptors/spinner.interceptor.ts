import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let completed = false;
        timer(500).subscribe(_ => {
            if (!completed) {
                this.spinnerService.visible = true;
            }
        });

        return next.handle(request).pipe(
            tap((event: HttpEvent<unknown>) => {
                if (event instanceof HttpResponse) {
                    completed = true;
                    this.spinnerService.visible = false;
                }
            }, error => {
                completed = true;
                this.spinnerService.visible = false;
            })
        );
    }
}
