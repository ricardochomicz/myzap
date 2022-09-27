import { Component, HostListener, OnInit } from '@angular/core';
//@ts-ignore
import pace from 'pace'
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular-app';

    showMenu: boolean = false;

    constructor(public authService: AuthService) {

    }


    ngOnInit(): void {
        this.authService.showMenu.subscribe(
            show => this.showMenu = show
        );
        pace.start({
            document: false
        });
    }

    // @HostListener('window:beforeunload', ['$event'])
    // public beforeunloadHandler($event: any) {
    //     alert('lascou');
    // }



}
