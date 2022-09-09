import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductNewModalComponent } from './../product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from './../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './../product-delete-modal/product-delete-modal.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    products: Array<Product> = [];

    productId!: any

    showOverlay = true;

    @ViewChild(ProductNewModalComponent)
    productNewModal!: ProductNewModalComponent

    @ViewChild(ProductEditModalComponent)
    productEditModal!: ProductEditModalComponent

    @ViewChild(ProductDeleteModalComponent)
    productDeleteModal!: ProductDeleteModalComponent

    constructor(private productHttp: ProductHttpService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getProducts()
    }

    getProducts(){
        this.productHttp.list()
        .subscribe({
            next: (response) => {
                console.log(response)
                this.products = response.data
                this.showOverlay = false
            },
            error: (error) => {
                this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
            }
        })
    }

    showModalInsert() {
        this.productNewModal.showModal()
    }

    showModalEdit(productId: any) {
        this.productId = productId
        this.productEditModal.showModal()
    }

    showModalDelete(productId: any) {
        this.productId = productId
        this.productDeleteModal.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Produto cadastrado com sucesso!');
        this.getProducts();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

    onEditSuccess($event: any) {
        this.toastr.success('Produto atualizado com sucesso!');
        this.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
    }

    onDeleteSuccess() {
        this.toastr.success('Produto excluído com sucesso!');
        this.getProducts();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
    }

}
