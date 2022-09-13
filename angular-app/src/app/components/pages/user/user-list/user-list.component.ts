import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { UserHttpService } from './../../../../services/http/user-http.service';
import { ToastrService } from 'ngx-toastr';
import { UserNewModalComponent } from './../user-new-modal/user-new-modal.component';
import { UserInsertService } from './user-insert.service';
import { UserEditService } from './user-edit.service';
import { UserEditModalComponent } from './../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './../user-delete-modal/user-delete-modal.component';
import { UserDeleteService } from './user-delete.service';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: Array<User> = []

    userId!: any

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    @ViewChild(UserNewModalComponent)
    userNewModal!: UserNewModalComponent

    @ViewChild(UserEditModalComponent)
    userEditModal!: UserEditModalComponent

    @ViewChild(UserDeleteModalComponent)
    userDeleteModal!: UserDeleteModalComponent


    constructor(private userHttp: UserHttpService,
        private toastr: ToastrService,
        protected userInsertService: UserInsertService,
        protected userEditService: UserEditService,
        protected userDeleteService: UserDeleteService) {
        this.userInsertService.userListComponent = this
        this.userEditService.userListComponent = this
        this.userDeleteService.userListComponent = this
    }

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers() {
        this.userHttp.list({ page: this.pagination.page })
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.users = response.data
                    this.pagination.totalItems = response.meta.total
                    this.pagination.itemsPerPage = response.meta.per_page
                },
                error: (error) => {
                    this.toastr.error('Erro ao carregar categorias!', error.status + ' ' + error.statusText);
                }
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getUsers()
    }


}
