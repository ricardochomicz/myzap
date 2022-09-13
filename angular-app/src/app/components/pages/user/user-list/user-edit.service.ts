import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from './user-list.component';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class UserEditService {

    private _userListComponent!: UserListComponent

    constructor(private toastr: ToastrService) {

    }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value
    }

    showModalEdit(userId: any) {
        this._userListComponent.userId = userId
        this._userListComponent.userEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.toastr.success('Usuário atualizado com sucesso')
        this._userListComponent.getUsers()
    }

    onEditError($event: HttpErrorResponse) {
        this.toastr.error('Erro na requisição ' + event)
        console.log($event)
    }
}