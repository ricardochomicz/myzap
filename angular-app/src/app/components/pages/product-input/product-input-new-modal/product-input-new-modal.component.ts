import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from 'src/app/models';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { environment } from './../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductInputHttpService } from './../../../../services/http/product-input-http.service';

@Component({
    selector: 'product-input-new-modal',
    templateUrl: './product-input-new-modal.component.html',
    styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {

    form!: FormGroup

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    selectedProduct!: number;


    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private http: HttpClient, private formBuilder: FormBuilder,
        private productInputHttp: ProductInputHttpService) {
        this.form = this.formBuilder.group({
            product_id: ['', [Validators.required]],
            amount: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {

    }



    submit() {
        this.productInputHttp.create(this.form.value)
            .subscribe({
                next: (response) => {
                    this.onSuccess.emit(response);
                    this.modal.hide();
                },
                error: (error) => {
                    this.onError.emit(error);
                }
            });
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {

    }

}
