import { Injectable } from "@angular/core";
import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})

export class ProductEditService {

    private _productListComponent!: ProductListComponent

    constructor(private toastr: ToastrService) {

    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value
    }

    showModalEdit(productId: any) {
        this._productListComponent.productId = productId
        this._productListComponent.productEditModal.showModal()
    }

    onEditSuccess($event: any) {
        this.toastr.success('Produto atualizado com sucesso!');
        this._productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.error('Erro na requisição!');
    }

}