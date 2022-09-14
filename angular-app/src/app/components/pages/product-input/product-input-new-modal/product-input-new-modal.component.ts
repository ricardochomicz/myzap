import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
    selector: 'product-input-new-modal',
    templateUrl: './product-input-new-modal.component.html',
    styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor() { }

    ngOnInit(): void {
    }

    submit(){}

    showModal() {
        this.modal.show()
    }

    hideModal($event: any){

    }

}
