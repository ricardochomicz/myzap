import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'list-errors',
    templateUrl: './list-errors.component.html',
    styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent implements OnInit {

    @Input()
    errors = {}
    constructor() { }

    ngOnInit(): void {
    }

    get errorsKeys() {
        return Object.keys(this.errors)
    }

}
