import { Injectable } from "@angular/core";
import { ProductInputListComponent } from './product-input-list.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductInputInsertService {

    private _productInputListComponent!: ProductInputListComponent

    constructor(private toastr: ToastrService) { }

    set productInputListComponent(value: ProductInputListComponent) {
        this._productInputListComponent = value
    }

    showModalInsert() {
        this._productInputListComponent.inputNewModal.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Entrada cadastrada com sucesso!');
        this._productInputListComponent.getInputs();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.success('Erro na requisição!');
    }
}

