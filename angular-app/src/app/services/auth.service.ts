import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models';

const TOKEN_KEY = 'access_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private accessToken!: string;

    //@ts-ignore
    me!: User

    constructor(private http: HttpClient) {
        this.getMe()
    }

    login(user: { email: string, password: string }): Observable<{ token: string }> {
        return this.http
            .post<{ token: string }>("http://localhost:8000/api/login", user)
            .pipe(
                tap(response => {
                    this.setToken(response.token)
                    //@ts-ignore
                    this.setUserFromToken(response.user)
                    this.getMe()
                })
            )
    }


    setToken(token: string) {
        // this.setUserFromToken(token)
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY)
    }

    setUserFromToken(user: User) {
        //@ts-ignore
        window.localStorage.setItem('user', user)
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    //@ts-ignore
    isAuth(): boolean {
        //TODO: Check token expiry and other security checks    
        return !!localStorage.getItem('access_token');
    }

    getMe() {
        this.http.get('http://localhost:8000/api/me', {
            headers: { 'Authorization': `Bearer ${this.getToken()}` }
        }).subscribe(response => {
            //@ts-ignore
            this.me = response.data
        });
    }



    logout(): Observable<any> {
        const token = window.localStorage.getItem('access_token')
        return this.http
            .get<{ token: string }>("http://localhost:8000/api/logout", {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .pipe(
                tap(() => {
                    //@ts-ignore
                    this.setToken(null)
                    //@ts-ignore
                    this.me = null
                })
            )
    }


}
