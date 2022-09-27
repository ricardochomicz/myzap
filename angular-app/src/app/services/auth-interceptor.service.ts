import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private route: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = window.localStorage.getItem('token');

        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            },
        });

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.status === 200) {
                        next.handle(req)
                    }
                }
            }),
            //@ts-ignore
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 && error.statusText === 'Unauthorized') {
                        window.localStorage.removeItem('token')
                        this.route.navigate(['login'])
                    }
                }
            })
        );
    }
}
