import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

    @Output()
    showChange: EventEmitter<boolean> = new EventEmitter<boolean>()
    _show = false;

    constructor() { }

    ngOnInit(): void {
    }

    @Input()
    set show(value: boolean) {
        this._show = value;
        this.showChange.emit(value)
    }

    hide() {
        this.show = false;
    }

}
