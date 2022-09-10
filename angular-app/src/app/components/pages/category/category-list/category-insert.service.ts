import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { CategoryListComponent } from './category-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CategoryInsertService {

    private _categoryListComponent!: CategoryListComponent;

    constructor(private toastr: ToastrService) {

    }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalInsert() {
        this._categoryListComponent.categoryNewModal.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Categoria cadastrada com sucesso!');
        this._categoryListComponent.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.toastr.error('Erro na requisição!');
    }
}