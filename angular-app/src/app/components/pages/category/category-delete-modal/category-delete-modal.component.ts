import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(private categoryHttp: CategoryHttpService, private toastr: ToastrService) { }

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
                        this.category = response.data
                        this.showOverlay = false
                    },
                    error: (error) => {
                        this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
                    }
                })
        }
    }

    submit() {
        this.categoryHttp.destroy(this._categoryId)
            .subscribe({
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
