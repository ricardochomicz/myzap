import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'category-search',
    templateUrl: './category-search.component.html',
    styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

    search!: string

    @Output()
    onSearch: EventEmitter<string> = new EventEmitter<string>()

    constructor() { }

    ngOnInit(): void {
    }

    submit() {
        this.onSearch.emit(this.search)
        return false;
    }

}
