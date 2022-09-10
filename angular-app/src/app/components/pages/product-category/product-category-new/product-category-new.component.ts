import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category, ProductCategory } from 'src/app/models';
import { ProductCategoryHttpService } from './../../../../services/http/product-category-http.service';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'product-category-new',
    templateUrl: './product-category-new.component.html',
    styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

    @Input()
    productId!: number;
    @Input()
    productCategory: ProductCategory | undefined;
    categories: Category[] = []
    categoriesId!: []

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productCategoryHttp: ProductCategoryHttpService,
        private categoryHttp: CategoryHttpService,
        private toastr: ToastrService,) { }

    ngOnInit(): void {
        this.getCategories()
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



    submit() {
        const categoriesId = this.mergeCategories()
        this.productCategoryHttp.create(this.productId, categoriesId)
            .subscribe({
                next: () => {
                    this.onSuccess.emit(this.productCategory)
                    this.toastr.success('Categoria(s) incluída(s) com sucesso');
                },
                error: (error) => {
                    this.onError.emit(error)
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
