import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: any;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getCategories()
    }
    getCategories() {
        const token = window.localStorage.getItem('access_token')
        this.http.get("http://localhost:8000/api/categories", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).subscribe(response => {
            //@ts-ignore
            this.categories = response.data
            console.log(this.categories)
        })

    }

}
