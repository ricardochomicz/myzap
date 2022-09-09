import { Observable } from "rxjs/internal/Observable";


export interface HttpResource<T> {
    list(): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>

    create(data: T): Observable<T>;

    update(id: number, data: T): Observable<T>;

    delete(id: number): Observable<any>;
}