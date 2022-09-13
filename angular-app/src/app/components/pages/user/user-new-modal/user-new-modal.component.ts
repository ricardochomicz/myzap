import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from './../../../../services/http/user-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'user-new-modal',
    templateUrl: './user-new-modal.component.html',
    styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

    user = {
        name: '',
        email: '',
        password: ''
    }

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()


    constructor(private userHttp: UserHttpService) { }

    ngOnInit(): void {
    }

    submit() {
        this.userHttp.create(this.user)
            .subscribe({
                next: (user) => {
                    this.onSuccess.emit(user)
                    this.modal.hide()
                },
                error: (error) => {
                    this.onError.emit(error)
                }
            })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log($event)
    }

}
