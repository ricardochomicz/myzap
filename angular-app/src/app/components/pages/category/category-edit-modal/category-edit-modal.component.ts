import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';


@Component({
    selector: 'category-edit-modal',
    templateUrl: './category-edit-modal.component.html',
    styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

    _categoryId!: number;

    category = {
        name: '',
        active: true
    }

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
        this.http.put(`http://localhost:8000/api/categories/${this._categoryId}`, this.category, {
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
