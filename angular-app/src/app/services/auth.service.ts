import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from './../models';


const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated: boolean = false;
    showMenu = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {

    }

    login(user: { email: string, password: string }): Observable<{ token: string }> {
        return this.http
            .post<{ token: string, user: User }>(`${environment.api.url}/login`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.token);                   
                })
            )
    }


    setToken(token: string) {
        //this.setUserFromToken()
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY)
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    // setUserFromToken() {
    //     this.isAuthenticated = true
    // }

    //@ts-ignore
    isAuth(): boolean {
        //TODO: Check token expiry and other security checks       
        return !!localStorage.getItem(TOKEN_KEY);
    }


    logout(): Observable<any> {
        return this.http
            .get<{ token: string }>(`${environment.api.url}/logout`)
            .pipe(
                tap(() => {
                    //@ts-ignore
                    this.setToken(null)
                })
            )
    }


}
