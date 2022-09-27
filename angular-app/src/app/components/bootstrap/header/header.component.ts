import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';
import { environment } from './../../../../environments/environment.prod';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private baseUrl = `${environment.api.url}/me`;
    me!: User
    constructor(public authService: AuthService, private route: Router, private http: HttpClient) { }

    ngOnInit(): void {
        this.getMe()
    }

    logout() {
        this.authService.logout()
            .subscribe(() => {
                this.route.navigate(['login'])
            })
    }

    getMe() {
        this.http.get(this.baseUrl)
            .subscribe({
                next: (response) => {
                    if (response) {
                        //@ts-ignore
                        this.me = response.data
                    }
                },
                error: (error) => {
                    console.log(error)
                }
            });
    }

}
