import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public authService: AuthService, private route: Router) { }

    ngOnInit(): void {

    }

    logout() {
        this.authService.logout()
            .subscribe(() => {
                this.route.navigate(['login'])
            })
    }

}
