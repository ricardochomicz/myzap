import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryHttpService } from './../../../../services/http/product-category-http.service';
import { ProductCategory } from './../../../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'product-category-list',
    templateUrl: './product-category-list.component.html'
})
export class ProductCategoryListComponent implements OnInit {

    productId!: number;
    product: Product | undefined;
    productCategory: ProductCategory | undefined;
    showOverlay = true;

    constructor(private route: ActivatedRoute,
        private productHttp: ProductHttpService,
        private toastr: ToastrService,
        private productCategoryHttp: ProductCategoryHttpService) { }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params) => {
                //@ts-ignore
                this.productId = params.product
                this.getProduct()
                this.getProductCategory()

            },
            error: (error) => {
                this.toastr.error('Erro na requisição!', error.status + ' ' + error.statusText);
            }
        })

    }

    getProduct() {
        this.productHttp.get(this.productId)
            .subscribe({
                next: (product) => {
                    this.product = product
                    this.showOverlay = false
                },
                error: (error) => {
                    this.toastr.error('Erro na requisição!', error.status + ' ' + error.statusText);
                }
            })
    }

    onInsertSuccess($event: any) {
        this.getProductCategory();
    }

    getProductCategory() {
        this.productCategoryHttp
            .list(this.productId)
            .subscribe({
                next: (productCategory) => {
                    this.productCategory = productCategory
                    this.showOverlay = false
                },
                error: (error) => {
                    this.toastr.error('Erro na requisição!', error.status + ' ' + error.statusText);
                }
            })
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event)
    }



}
