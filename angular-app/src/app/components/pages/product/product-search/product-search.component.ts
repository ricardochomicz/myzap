import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

    search!: string
    active!: boolean

    @Output()
    onSearch: EventEmitter<any> = new EventEmitter<any>()

    constructor() { }

    ngOnInit(): void {
    }

    submit() {
        this.onSearch.emit(this.search)
        return false;
    }

}
