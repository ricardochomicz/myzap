import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'product-edit-modal',
    templateUrl: './product-edit-modal.component.html'
})
export class ProductEditModalComponent implements OnInit {

    form: FormGroup

    errors = {}

    _productId!: number;

    showOverlay = true;

    @ViewChild(ModalComponent) modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productHttp: ProductHttpService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],
            description: '',
            active: true
        })
    }

    ngOnInit(): void {
    }

    @Input()
    set productId(value: number) {
        this._productId = value
        if (this._productId) {
            this.productHttp.get(value)
                .subscribe({
                    next: (response) => {
                        //@ts-ignore
                        this.form.patchValue(response)
                        this.showOverlay = false
                    },
                    error: (error) => {
                        this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
                    }
                })
        }
    }

    submit() {
        this.productHttp.update(this._productId, this.form.value)
            .subscribe({
                next: (product) => {
                    this.onSuccess.emit(product)
                    this.modal.hide()
                    this.showOverlay = false
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

    showErrors() {
        return Object.keys(this.errors).length != 0
    }

    hideModal($event: any) {
        console.log($event)
    }


}
