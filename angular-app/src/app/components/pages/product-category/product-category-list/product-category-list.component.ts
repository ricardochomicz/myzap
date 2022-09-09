import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'product-category-list',
    templateUrl: './product-category-list.component.html'
})
export class ProductCategoryListComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => console.log(params))
    }

}
