import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from './../category-form/category-field-options';


@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html'
})
export class CategoryNewModalComponent implements OnInit {

    form: FormGroup

    errors = {}

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()


    constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
        //@ts-ignore
        const maxlength = fieldsOptions.name.validationMessage.maxlength
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxlength)]],
        })

    }

    ngOnInit(): void {
    }

    submit() {
        this.categoryHttp.create(this.form.value)
            .subscribe({
                next: (category) => {
                    this.form.reset()
                    this.onSuccess.emit(category)
                    this.modal.hide()
                },
                error: (er) => {
                    if (er.status === 422) {
                        this.errors = er.error.errors
                    }
                    this.onError.emit(er)
                }
            })
    }

    showModal() {
        this.modal.show()
    }

    showErrors() {
        return Object.keys(this.errors).length != 0
    }

    hideModal($event: any) {
        
        this.form.reset()
    }

}
