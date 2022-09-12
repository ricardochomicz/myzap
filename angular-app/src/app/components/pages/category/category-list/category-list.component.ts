import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { CategoryNewModalComponent } from './../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { CategoryInsertService } from './category-insert.service';
import { CategoryEditService } from './category-edit.service';
import { CategoryDeleteService } from './category-delete.service';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

    categoryId!: any

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 5
    }

    showOverlay = true;

    @ViewChild(CategoryNewModalComponent)
    categoryNewModal!: CategoryNewModalComponent

    @ViewChild(CategoryEditModalComponent)
    categoryEditModal!: CategoryEditModalComponent

    @ViewChild(CategoryDeleteModalComponent)
    categoryDeleteModal!: CategoryDeleteModalComponent

    constructor(
        private toastr: ToastrService,
        private categoryHttp: CategoryHttpService,
        protected categoryInsertService: CategoryInsertService,
        protected categoryEditService: CategoryEditService,
        protected categoryDeleteService: CategoryDeleteService) {
        this.categoryInsertService.categoryListComponent = this
        this.categoryEditService.categoryListComponent = this
        this.categoryDeleteService.categoryListComponent = this
    }

    ngOnInit(): void {
        this.getCategories()
    }

    getCategories() {
        this.categoryHttp.list({ page: this.pagination.page })
            .subscribe({
                next: (response) => {
                    this.categories = response.data
                    this.pagination.totalItems = response.meta.total
                    this.pagination.itemsPerPage = response.meta.per_page
                    this.showOverlay = false
                },
                error: (error) => {
                    this.toastr.error('Erro ao carregar categorias!', error.status + ' ' + error.statusText);
                }
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getCategories()
    }

}
