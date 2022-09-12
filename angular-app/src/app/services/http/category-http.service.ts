import { Injectable } from '@angular/core';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { Category } from './../../models';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './../auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

    private baseUrl = "http://localhost:8000/api/categories";

    constructor(private http: HttpClient, private authService:AuthService) { }

    list(searchParams: SearchParams): Observable<{ data: Array<Category>, meta: any; }> {
        const token = this.authService.getToken();
        const sParams = new SearchParamsBuilder(searchParams).makeObject()
        const params = new HttpParams({        
            fromObject: sParams
        })
        return this.http
            .get<{ data: Array<Category>, meta: any; }>(this.baseUrl, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


    }
    get(id: number): Observable<Category> {
        const token = this.authService.getToken();
        return this.http
            .get<{ data: Category }>(`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).pipe(
                map(response => response.data)
            )
    }
    create(data: Category): Observable<Category> {
        const token = this.authService.getToken();
        return this.http
            .post<{ data: Category }>(this.baseUrl, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).pipe(
                map(response => response.data)
            )
    }
    update(id: number, data: Category): Observable<Category> {
        const token = this.authService.getToken();
        return this.http
            .put<{ data: Category }>(`${this.baseUrl}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).pipe(
                map(response => response.data)
            )
    }
    delete(id: number): Observable<any> {
        const token = this.authService.getToken();
        return this.http
            .delete<any>(`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
}
