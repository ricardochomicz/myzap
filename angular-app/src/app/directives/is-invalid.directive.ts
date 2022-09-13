import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[isInvalid]'
})
export class IsInvalidDirective {

    constructor(private element: ElementRef, private control: NgControl) { }

    ngOnInit() {
        //para cada interação no campo de form o subscribe é ativado
        this.control.valueChanges?.subscribe({
            next: () => {
                const nativeElement: HTMLElement = this.element.nativeElement
                if (this.control.invalid && (this.control.dirty || this.control.touched)) {
                    //verifica se já contem a classe, senão tiver adiciona
                    if (!nativeElement.classList.contains('is-invalid')) {
                        nativeElement.classList.add('is-invalid')
                    }
                } else {
                    //se tiver remove
                    nativeElement.classList.remove('is-invalid')
                }
            }
        })
    }
}
