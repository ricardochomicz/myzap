import { Injectable } from "@angular/core";
import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})

export class ProductDeleteService {

    private _productListComponent!: ProductListComponent

    constructor(private toastr: ToastrService) {

    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value
    }

    showModalDelete(productId: any) {
        this._productListComponent.productId = productId
        this._productListComponent.productDeleteModal.showModal()
    }

    onDeleteSuccess() {
        this.toastr.success('Produto excluído com sucesso!');
        this._productListComponent.getProducts();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.error('Erro na requisição!');
    }

}