import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Category, Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryHttpService } from './../../../../services/http/product-category-http.service';
import { ProductCategory } from './../../../../models';
import { CategoryHttpService } from './../../../../services/http/category-http.service';

@Component({
    selector: 'product-category-list',
    templateUrl: './product-category-list.component.html'
})
export class ProductCategoryListComponent implements OnInit {

    productId!: number;
    product: Product | undefined;
    productCategory: ProductCategory | undefined;
    categories: Category[] = []
    categoriesId!: []
    showOverlay = true;

    constructor(private route: ActivatedRoute,
        private productHttp: ProductHttpService,
        private toastr: ToastrService,
        private productCategoryHttp: ProductCategoryHttpService,
        private categoryHttp: CategoryHttpService) { }

    ngOnInit(): void {
        this.getCategories()
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

    change($event: any) {
        console.log($event)
    }

    getCategories() {
        this.categoryHttp
            .list()
            .subscribe({
                next: (response) => {
                    //@ts-ignore
                    this.categories = response.data
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

    submit() {
        const categoriesId = this.mergeCategories()
        this.productCategoryHttp.create(this.productId, categoriesId)
            .subscribe({
                next: () => {
                    this.getProductCategory()
                    this.toastr.success('Categoria incluída com sucesso');
                },
                error: (error) => {
                    this.toastr.error('Erro na requisição!', error.status + ' ' + error.statusText);
                }
            })
        return false;
    }

    //@ts-ignore
    private mergeCategories(): number[] {
        //pega o array de ids de categories relacionadas com o produto
        //para cada category que tiver dentro da coleção de categories é incluido o categoru id
        //@ts-ignore
        const categoriesId = this.productCategory.categories.map((category) => category.id)
        const newCategoriesId = this.categoriesId?.filter((category) => {
            //pega somente os elementos não presentes no array
            return categoriesId.indexOf(category) == -1
        });
        //@ts-ignore
        return categoriesId.concat(newCategoriesId)
    }

}
