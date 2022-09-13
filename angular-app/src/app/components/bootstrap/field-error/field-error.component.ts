import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.css'],
    host: {
        'class': 'invalid-feedback'
    }
})
export class FieldErrorComponent implements OnInit {

    @Input()
    field!: FormControl;
    constructor() { }

    ngOnInit(): void {
    }

    get errorKeys() {
        //@ts-ignore
        return Object.keys(this.errors)
    }

    get errors() {
        return this.field.errors
    }

    showError() {
        return this.field.invalid && (this.field.dirty || this.field.touched)
    }



}
