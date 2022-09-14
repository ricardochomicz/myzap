import { Injectable } from '@angular/core';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { ProductInput } from 'src/app/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductInputHttpService {

    private baseUrl = `${environment.api.url}/inputs`;

    constructor(private http: HttpClient) { }

    list(searchParams: SearchParams): Observable<{ data: Array<ProductInput>; meta: any; }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject()
        const params = new HttpParams({
            fromObject: sParams
        })
        return this.http
            .get<{ data: Array<ProductInput>, meta: any; }>(this.baseUrl, {
                params
            })
    }

    get(id: number): Observable<ProductInput> {
        return this.http.get<{ data: ProductInput }>(`${this.baseUrl}/${id}`)
            .pipe(map(response => response.data))
    }

    create(data: {amount: number, product_id: number}): Observable<ProductInput> {
        return this.http.post<{ data: ProductInput }>(this.baseUrl, data)
            .pipe(map(response => response.data))
    }

}
