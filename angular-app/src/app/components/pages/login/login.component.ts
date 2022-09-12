import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';

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

    constructor(private authService: AuthService, private route: Router, private toastr: ToastrService) { }

    ngOnInit(): void {

    }

    login() {
        this.authService.login(this.credentials)
            .subscribe({
                next: () => {
                    this.route.navigate(['categories/list'])
                },
                error: (erro) => {
                    console.log(erro.statusText)
                    this.toastr.error('Credenciais Inválidas!', erro.statusText);
                }
            })
        return false;
    }

}
