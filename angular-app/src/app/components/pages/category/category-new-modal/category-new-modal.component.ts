import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html',
    styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

    category = {
        name: ''
    }

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()


    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    submit() {
        const token = window.localStorage.getItem('access_token');
        this.http.post("http://localhost:8000/api/categories", this.category, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).subscribe({
            next: (category) => {
                this.onSuccess.emit(category)
                this.modal.hide()
            },
            error: (error) => {
                this.onError.emit(error)
                //this.toastr.error('Erro ao cadastrar categoria!', error.status + ' ' + error.statusText);
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
