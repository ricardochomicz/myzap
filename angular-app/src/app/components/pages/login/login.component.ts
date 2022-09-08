import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {
        email: "gisa@email.com",
        password: "password"
    }

    constructor(private http: HttpClient, private route: Router) { }

    ngOnInit(): void {

    }

    login() {
        this.http.post("http://localhost:8000/api/login", this.credentials)
            .subscribe(response => {
                //@ts-ignore
                const token = response.token
                window.localStorage.setItem('access_token', token)
                this.route.navigate(['categories'])
            })
        return false;
    }



}
