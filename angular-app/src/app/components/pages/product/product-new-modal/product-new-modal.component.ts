import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'product-new-modal',
    templateUrl: './product-new-modal.component.html'
})
export class ProductNewModalComponent implements OnInit {

    form: FormGroup

    errors = {}

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],
            description: ''
        })
    }

    ngOnInit(): void {
    }

    submit() {
        this.productHttp.create(this.form.value)
            .subscribe({
                next: (product) => {
                    this.form.reset()
                    this.onSuccess.emit(product)
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
    }

    showErrors() {
        return Object.keys(this.errors).length != 0
    }

    hideModal($event: any) {
        console.log($event)
    }

}
