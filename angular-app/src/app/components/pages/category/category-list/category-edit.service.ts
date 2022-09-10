import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { CategoryListComponent } from './category-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CategoryEditService{

    private _categoryListComponent!: CategoryListComponent;

    constructor(private toastr: ToastrService) {

    }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalEdit(categoryId: any) {
        this._categoryListComponent.categoryId = categoryId
        this._categoryListComponent.categoryEditModal.showModal()
    }

    onEditSuccess($event: any) {
        this.toastr.success('Categoria atualizada com sucesso!');
        this._categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.error('Erro na requisição!');
    }

}