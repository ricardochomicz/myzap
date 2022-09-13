import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';


const TOKEN_KEY = 'access_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(user: { email: string, password: string }): Observable<{ token: string }> {
        return this.http
            .post<{ token: string, user: User }>(`${environment.api.url}/login`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.token)
                })
            )
    }


    setToken(token: string) {
        // this.setUserFromToken(token)
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY)
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    //@ts-ignore
    isAuth(): boolean {
        //TODO: Check token expiry and other security checks    
        return !!localStorage.getItem('access_token');
    }


    logout(): Observable<any> {
        const token = window.localStorage.getItem('access_token')
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
