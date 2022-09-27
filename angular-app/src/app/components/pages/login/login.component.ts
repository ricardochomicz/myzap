import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from './../../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models';

const TOKEN_KEY = 'token';

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

    constructor(public authService: AuthService,
        private route: Router,
        private toastr: ToastrService,
        private http: HttpClient) { }

    ngOnInit(): void {

    }


    login() {
        this.authService.login(this.credentials)
            .subscribe({
                next: () => {
                    this.route.navigate(['products/list']);
                },
                error: (error) => {
                    this.toastr.error('Credenciais inválidas!');
                }
            });
    }

}
