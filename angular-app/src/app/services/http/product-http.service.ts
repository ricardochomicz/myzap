import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models';
import { HttpResource } from './http-resource';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

    private baseUrl = "http://localhost:8000/api/products";

    constructor(private http: HttpClient) { }
    list(): Observable<{ data: Product[]; meta: any; }> {
        const token = window.localStorage.getItem('access_token')
        return this.http.get<{ data: Product[]; meta: any; }>(this.baseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    get(id: number): Observable<Product> {
        const token = window.localStorage.getItem('access_token')
        return this.http.get<{ data: Product }>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    create(data: Product): Observable<Product> {
        const token = window.localStorage.getItem('access_token')
        return this.http.post<{ data: Product }>(this.baseUrl, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    update(id: number, data: Product): Observable<Product> {
        const token = window.localStorage.getItem('access_token')
        return this.http.put<{ data: Product }>(`${this.baseUrl}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    delete(id: number): Observable<any> {
        const token = window.localStorage.getItem('access_token')
        return this.http.delete<any>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
