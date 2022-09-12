import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductNewModalComponent } from './../product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from './../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './../product-delete-modal/product-delete-modal.component';
import { ProductInsertService } from './product-insert.service';
import { ProductEditService } from './product-edit.service';
import { ProductDeleteService } from './product-delete.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    products: Array<Product> = [];

    productId!: any

    @Input()
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    showOverlay = true;

    @ViewChild(ProductNewModalComponent)
    productNewModal!: ProductNewModalComponent

    @ViewChild(ProductEditModalComponent)
    productEditModal!: ProductEditModalComponent

    @ViewChild(ProductDeleteModalComponent)
    productDeleteModal!: ProductDeleteModalComponent

    constructor(private productHttp: ProductHttpService,
        private toastr: ToastrService,
        protected productInsertService: ProductInsertService,
        protected productEditService: ProductEditService,
        protected productDeleteService: ProductDeleteService) {
        this.productInsertService.productListComponent = this
        this.productEditService.productListComponent = this
        this.productDeleteService.productListComponent = this
    }

    ngOnInit(): void {
        this.getProducts()
    }

    getProducts() {
        this.productHttp.list({ page: this.pagination.page })
            .subscribe({
                next: (response) => {
                    this.products = response.data
                    this.pagination.totalItems = response.meta.total
                    this.pagination.itemsPerPage = response.meta.per_page
                    this.showOverlay = false
                },
                error: (error) => {
                    this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
                }
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getProducts()
    }

}
