import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './../category-delete-modal/category-delete-modal.component';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

    categoryId!: any

    showOverlay = true;

    @ViewChild(CategoryNewModalComponent)
    categoryNewModal!: CategoryNewModalComponent

    @ViewChild(CategoryEditModalComponent)
    categoryEditModal!: CategoryEditModalComponent

    @ViewChild(CategoryDeleteModalComponent)
    categoryDeleteModal!: CategoryDeleteModalComponent

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getCategories()
    }

    getCategories() {
        const token = window.localStorage.getItem('access_token')
        this.http.get<{ data: Array<Category> }>("http://localhost:8000/api/categories", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).subscribe({
            next: (response) => {
                this.categories = response.data
                this.showOverlay = false
            },
            error: (error) => {
                this.toastr.error('Erro ao carregar categorias!', error.status + ' ' + error.statusText);
            }
        })
    }


    showModalInsert() {
        this.categoryNewModal.showModal()
    }

    showModalEdit(categoryId: any) {
        this.categoryId = categoryId
        this.categoryEditModal.showModal()
    }

    showModalDelete(categoryId: any) {
        this.categoryId = categoryId
        this.categoryDeleteModal.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Categoria cadastrada com sucesso!');
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

    onEditSuccess($event: any) {
        this.toastr.success('Categoria atualizada com sucesso!');
        this.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
    }

    onDeleteSuccess() {
        this.toastr.success('Categoria excluída com sucesso!');
        this.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
    }

}
