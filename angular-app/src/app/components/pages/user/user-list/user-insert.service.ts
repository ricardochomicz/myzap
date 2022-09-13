import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from "./user-list.component";
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class UserInsertService {

    private _userListComponent!: UserListComponent
    constructor(private toastr: ToastrService) {

    }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value
    }

    showModalInsert(){
        this._userListComponent.userNewModal.showModal()
    }

    onInsertSuccess($event: any){
        this.toastr.success('Usuário cadastrado com sucesso')
        this._userListComponent.getUsers()
    }

    onInsertError($event: HttpErrorResponse){
        this.toastr.error('Erro ao cadastrar usuário ' + $event)
    }
}