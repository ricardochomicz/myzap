import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from './../../../../services/http/product-http.service';

@Component({
    selector: 'product-new-modal',
    templateUrl: './product-new-modal.component.html'
})
export class ProductNewModalComponent implements OnInit {

    product = {
        name: '',
        price: '',
        description: ''
    }

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productHttp: ProductHttpService) { }

    ngOnInit(): void {
    }

    submit() {
        this.productHttp.create(this.product)
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
    }

    hideModal($event: any) {
        console.log($event)
    }

}
