import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

    constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

    ngOnInit(): void {

    }

    login() {
        this.http.post("http://localhost:8000/api/login", this.credentials)
            .subscribe({
                next: (response) => {
                    //@ts-ignore
                    const token = response.token
                    window.localStorage.setItem('access_token', token)
                    this.route.navigate(['categories'])
                },
                error: (erro) => {
                    console.log(erro.statusText)
                    this.toastr.error('Credenciais Inválidas!', erro.statusText);
                }

            })
        return false;
    }

}
