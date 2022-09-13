import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from './../../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {

    constructor(private http: HttpClient) { }

    list(productId: number): Observable<ProductCategory> {
        const token = window.localStorage.getItem('access_token');
        return this.http
            .get<{ data: ProductCategory }>(this.getBaseUrl(productId))
            .pipe(
                map(response => response.data)
            )
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
        const token = window.localStorage.getItem('access_token');
        return this.http
            .post<{ data: ProductCategory }>(this.getBaseUrl(productId), { categories: categoriesId })
            .pipe(
                map(response => response.data)
            )
    }

    private getBaseUrl(productId: number, categoryId = null): string {
        let baseUrl = `http://localhost:8000/api/product/${productId}/categories`;
        if (categoryId) {
            baseUrl += `/${categoryId}`
        }
        return baseUrl
    }
}
