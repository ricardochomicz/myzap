import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from './../../../../services/http/user-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'user-new-modal',
    templateUrl: './user-new-modal.component.html',
    styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

    form: FormGroup

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    showOverlay = false

    constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
    }

    submit() {
        this.showOverlay = true
        this.userHttp.create(this.form.value)
            .subscribe({
                next: (user) => {
                    this.onSuccess.emit(user);
                    this.showOverlay = false;
                    this.form.reset();
                    this.modal.hide();
                },
                error: (error) => {
                    this.onError.emit(error);
                }
            });
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log($event)
    }

}
