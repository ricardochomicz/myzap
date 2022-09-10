import { Injectable } from "@angular/core";
import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})

export class ProductInsertService {

    private _productListComponent!: ProductListComponent

    constructor(private toastr: ToastrService) {

    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value
    }

    showModalInsert() {
        this._productListComponent.productNewModal.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Produto cadastrado com sucesso!');
        this._productListComponent.getProducts();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.success('Erro na requisição!');
    }


}