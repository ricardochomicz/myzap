import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'product-edit-modal',
    templateUrl: './product-edit-modal.component.html'
})
export class ProductEditModalComponent implements OnInit {

    _productId!: number;

    product = {
        name: '',
        price: '',
        description: '',
        active: true
    }

    showOverlay = true;

    @ViewChild(ModalComponent) modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productHttp: ProductHttpService,
        private toastr: ToastrService) { }

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
                        this.product = response
                        this.showOverlay = false
                    },
                    error: (error) => {
                        this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
                    }
                })
        }
    }

    submit() {
        this.productHttp.update(this._productId, this.product)
            .subscribe({
                next: (product) => {
                    this.onSuccess.emit(product)
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
