import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import fieldsOptions from './category-field-options';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

    @Input()
    form!: FormGroup

    constructor(private changeRef: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    ngOnChanges() {
        this.changeRef.detectChanges()
    }

    get fieldOptions(): any {
        return fieldsOptions
    }

    get field() {
        return this.fieldOptions.name
    }

}
