import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

    category = {
        name: ''
    }

    @ViewChild(ModalComponent)
    modal!: ModalComponent

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
            },
            error: (error) => {
                this.toastr.error('Erro ao carregar categorias!', error.status + ' ' + error.statusText);
            }
        })
    }

    submit() {
        const token = window.localStorage.getItem('access_token')

    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log($event)
    }

}
