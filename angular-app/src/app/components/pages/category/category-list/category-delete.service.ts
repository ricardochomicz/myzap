import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { CategoryListComponent } from './category-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CategoryDeleteService {

    private _categoryListComponent!: CategoryListComponent;

    constructor(private toastr: ToastrService) {

    }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalDelete(categoryId: any) {
        this._categoryListComponent.categoryId = categoryId
        this._categoryListComponent.categoryDeleteModal.showModal()
    }


    onDeleteSuccess() {
        this.toastr.success('Categoria excluída com sucesso!');
        this._categoryListComponent.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.error('Erro na requisição!');
    }

}