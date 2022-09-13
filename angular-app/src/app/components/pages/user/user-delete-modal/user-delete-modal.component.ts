import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { UserHttpService } from './../../../../services/http/user-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'user-delete-modal',
    templateUrl: './user-delete-modal.component.html',
    styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

    user!: any

    _userId!: number

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
        this.userHttp.destroy(this._userId)
            .subscribe({
                next: (response) => {
                    this.onSuccess.emit(response)
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
