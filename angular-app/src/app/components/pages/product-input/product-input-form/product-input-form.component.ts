import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models';
import { environment } from './../../../../../environments/environment';
import fieldsOptions from './../../product-input/product-input-form/product-input-field-options';
import { ProductIdFieldService } from './product-id-field.service';

@Component({
    selector: 'product-input-form',
    templateUrl: './product-input-form.component.html',
    styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

    @Input()
    form!: FormGroup

    data = [ ]

    constructor(private http: HttpClient, private changeRef: ChangeDetectorRef, public productIdField: ProductIdFieldService) { }

    ngOnInit(): void {
        this.getProducts()
    }

    ngOnChanges(): void {
        this.changeRef.detectChanges()

    }

    getProducts() {
        this.http.get<{ data: Array<Product> }>(`${environment.api.url}/products-all`)
            .subscribe({
                next: (response) => {
                    //@ts-ignore
                    this.data.push(response.data)
                }
            })
    }

    get fieldOptions(): any {
        return fieldsOptions
    }

    get field() {
        return this.fieldOptions
    }

}
