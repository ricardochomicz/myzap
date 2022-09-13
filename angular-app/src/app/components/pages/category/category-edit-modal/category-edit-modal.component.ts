import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'category-edit-modal',
    templateUrl: './category-edit-modal.component.html',
    styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

    form: FormGroup
    _categoryId!: number;

    errors = {}

    showOverlay = true;

    @ViewChild(ModalComponent) modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()


    constructor(
        private categoryHttp: CategoryHttpService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            active: true
        })
    }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {
        this._categoryId = value
        if (this._categoryId) {
            this.categoryHttp.get(value)
                .subscribe({
                    next: (response) => {
                        this.form.patchValue(response)
                        this.showOverlay = false
                    },
                    error: (er) => {

                        this.toastr.error('Erro ao carregar categorias!', er.status + ' ' + er.statusText);
                    }
                })
        }
    }

    submit() {
        this.categoryHttp.update(this._categoryId, this.form.value)
            .subscribe({
                next: (category) => {
                    this.onSuccess.emit(category)
                    this.modal.hide()
                },
                error: (err) => {
                    if (err.status === 422) {
                        this.errors = err.error.errors
                    }
                    this.onError.emit(err)
                }
            })
    }

    showModal() {
        this.modal.show()
        this.showOverlay = true
    }

    showErrors() {
        return Object.keys(this.errors).length != 0
    }

    hideModal($event: any) {
        // console.log($event)
    }

}
