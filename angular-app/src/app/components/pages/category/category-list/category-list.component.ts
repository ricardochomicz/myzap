import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

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
            error: (erro) => {
                console.log(erro.statusText)
                this.toastr.error('Erro ao carregar categorias!', erro.status + ' ' + erro.statusText);
            }
        })
    }

    submit(){
        const token = window.localStorage.getItem('access_token')
        
    }

}
