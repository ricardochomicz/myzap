import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './../../../common/validation-message';

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
    @Input()
    label!: string
    @Input()
    messages!: string
    constructor() { }

    ngOnInit(): void {
    }

    get errorKeys() {
        return Object.keys(this.errors)
    }

    get errors(): any {
        return this.field.errors
    }

    showError() {
        return this.field.invalid && (this.field.dirty || this.field.touched)
    }

    getMessage(error: any) {
        //define os tokens
        let replaceTokens = [this.label]
        //verifica se dentro de messages existe a propriedade error com seu parametro
        if (this.messages && this.messages.hasOwnProperty(error)) {
            //verifica se messages é um array
            if (Array.isArray(this.messages[error])) {
                replaceTokens = replaceTokens.concat(this.messages[error])
            } else {
                replaceTokens.push(this.messages[error])
            }
        }
        return ValidationMessage.getMessage(error, replaceTokens)
    }



}
