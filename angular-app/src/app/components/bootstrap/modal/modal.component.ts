import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

//@ts-ignore
declare const $;

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

    @Output()
    onHide: EventEmitter<Event> = new EventEmitter<Event>()

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        const jQueryElement = this.getjQueryElement()
        jQueryElement.find('[modal-title]').addClass('modal-title')
        jQueryElement.find('[modal-body]').addClass('modal-body')
        jQueryElement.find('[modal-footer]').addClass('modal-footer')

        jQueryElement.on('hidden.bs.modal', function (e: any) {
            // console.log(e)
        })
    }

    show() {
        this.getjQueryElement().modal('show');
    }

    hide() {
        this.getjQueryElement().modal('hide');
    }

    private getjQueryElement() {
        const nativeElement = this.element.nativeElement;
        //captura primeiro elemento div da modal
        return $(nativeElement.firstChild);
    }

}
