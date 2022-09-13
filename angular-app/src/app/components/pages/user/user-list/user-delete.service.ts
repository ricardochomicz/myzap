import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from './user-list.component';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class UserDeleteService {

    private _userListComponent!: UserListComponent

    constructor(private toastr: ToastrService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value
    }

    showModalDelete(userId: any) {
        this._userListComponent.userId = userId
        this._userListComponent.userDeleteModal.showModal()
    }

    onDeleteSuccess() {
        this.toastr.success('Usuário excluído com sucesso')
        this._userListComponent.getUsers()
    }

    onDeleteError($event: HttpErrorResponse) {
        this.toastr.error('Erro na requisição')
        console.log($event)
    }

}