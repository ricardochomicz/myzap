import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private route: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuth = this.authService.isAuth();
        this.redirectIfUnauthenticated(isAuth);
        return isAuth;
    }

    private redirectIfUnauthenticated(isAuth: boolean) {
        if (!isAuth) {
            this.route.navigate(['login'])
        }

    }

}
