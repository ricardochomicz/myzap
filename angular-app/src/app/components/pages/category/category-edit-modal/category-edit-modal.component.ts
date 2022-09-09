import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private categoryHttp: CategoryHttpService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {
        this._categoryId = value
        if (this._categoryId) {
            this.categoryHttp.get(value)
                .subscribe({
                    next: (response) => {
                        //@ts-ignore
                        this.category = response
                        this.showOverlay = false
                    },
                    error: (error) => {
                        this.toastr.error('Erro ao carregar categorias!', error.status + ' ' + error.statusText);
                    }
                })
        }
    }

    submit() {
        this.categoryHttp.update(this._categoryId, this.category)
            .subscribe({
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
