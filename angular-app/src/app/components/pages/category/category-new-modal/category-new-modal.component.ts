import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html'
})
export class CategoryNewModalComponent implements OnInit {

    form: FormGroup

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()


    constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: '',          
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
                error: (error) => {
                    this.onError.emit(error)
                }
            })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log($event)
    }

}
