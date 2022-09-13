import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';

@Component({
    selector: 'user-edit-modal',
    templateUrl: './user-edit-modal.component.html',
    styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    _userId!: number

    user = {
        name: '',
        email: '',
        phone: ''
    }

    showOverlay = true

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private userHttp: UserHttpService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }



    @Input()
    set userId(value: number) {
        this._userId = value
        if (this._userId) {
            this.userHttp.get(value)
                .subscribe({
                    next: (response) => {
                        //@ts-ignore
                        this.user = response
                        this.showOverlay = false
                    },
                    error: (error) => {
                        this.toastr.error('Erro ao carregar usuário!', error.status + ' ' + error.statusText);
                    }
                })

        }
    }

    submit() {
        this.userHttp.update(this._userId, this.user)
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
        this.showOverlay = true
    }

    hideModal($event: any) {
        console.log(event)
    }

}
