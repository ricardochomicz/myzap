import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInput } from 'src/app/models';
import { ProductInputHttpService } from './../../../../services/http/product-input-http.service';
import { ToastrService } from 'ngx-toastr';
import { ProductInputInsertService } from './product-input-insert.service';
import { ProductInputNewModalComponent } from './../product-input-new-modal/product-input-new-modal.component';

@Component({
    selector: 'app-product-input-list',
    templateUrl: './product-input-list.component.html',
    styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

    inputs: Array<ProductInput> = []

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    @ViewChild(ProductInputNewModalComponent)
    inputNewModal!: ProductInputNewModalComponent

    searchText!: string

    constructor(private inputHttp: ProductInputHttpService,
        private toastr: ToastrService,
        protected productInputInsertService: ProductInputInsertService) {
        this.productInputInsertService.productInputListComponent = this
    }

    ngOnInit(): void {
        this.getInputs()
    }

    getInputs() {
        this.inputHttp.list({
            page: this.pagination.page,
            search: this.searchText
        })
            .subscribe({
                next: (response) => {
                    this.inputs = response.data
                    this.pagination.totalItems = response.meta.total
                    this.pagination.itemsPerPage = response.meta.per_page
                },
                error: (error) => {
                    this.toastr.error('Erro ao carregar entrada estoque!', error.status + ' ' + error.statusText);
                }
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getInputs()
    }

    search(search: any) {
        this.searchText = search
        this.getInputs()
    }

}
