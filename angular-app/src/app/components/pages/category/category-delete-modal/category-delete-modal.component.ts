import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
    selector: 'category-delete-modal',
    templateUrl: './category-delete-modal.component.html',
    styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

    category!: any;

    _categoryId!: number;

    showOverlay = true;

    @ViewChild(ModalComponent) modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {
        this._categoryId = value
        if (this._categoryId) {
            const token = window.localStorage.getItem('access_token')
            this.http.get(`http://localhost:8000/api/categories/${value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).subscribe({
                next: (response) => {
                    //@ts-ignore
                    this.category = response.data
                    this.showOverlay = false
                },
                error: (error) => {

                }
            })
        }
    }

    submit() {
        const token = window.localStorage.getItem('access_token')
        this.http.delete(`http://localhost:8000/api/categories/${this._categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).subscribe({
            next: () => {
                this.onSuccess.emit()
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
        console.log($event)
    }

}
