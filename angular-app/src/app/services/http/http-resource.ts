import { Observable } from "rxjs/internal/Observable";
import { HttpParams } from '@angular/common/http';

export interface SearchParams {
    page?: number
    all?: any
    search?: string;
}

export class SearchParamsBuilder {
    constructor(private searchParams: SearchParams) {
    }
    makeObject(): any {
        const sParams: any = {
            page: this.searchParams.page + "",
        }
        if (this.searchParams.all) {
            sParams.all = '1'
            delete sParams.page
        }
        if(this.searchParams.search && this.searchParams.search !== ""){
            sParams.search = this.searchParams.search
        }
        return sParams
    }
}

export interface HttpResource<T> {
    list(searchParams: SearchParams): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>

    create(data: T): Observable<T>;

    update(id: number, data: T): Observable<T>;

    destroy(id: number): Observable<any>;
}