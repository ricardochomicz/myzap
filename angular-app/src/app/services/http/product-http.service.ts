import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './../auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

    private baseUrl = "http://localhost:8000/api/products";

    constructor(private http: HttpClient, private authService: AuthService) { }
    list(searchParams: SearchParams): Observable<{ data: Array<Product>; meta: any; }> {
        const token = this.authService.getToken();
        const sParams = new SearchParamsBuilder(searchParams).makeObject()
        const params = new HttpParams({
            fromObject: sParams
        })
        return this.http.get<{ data: Product[]; meta: any; }>(this.baseUrl, {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    get(id: number): Observable<Product> {
        const token = this.authService.getToken();
        return this.http.get<{ data: Product }>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    create(data: Product): Observable<Product> {
        const token = this.authService.getToken();
        return this.http.post<{ data: Product }>(this.baseUrl, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    update(id: number, data: Product): Observable<Product> {
        const token = this.authService.getToken();
        return this.http.put<{ data: Product }>(`${this.baseUrl}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            map(response => response.data)
        )
    }

    delete(id: number): Observable<any> {
        const token = this.authService.getToken();
        return this.http.delete<any>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
