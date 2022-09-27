import { Injectable, ElementRef } from '@angular/core';
import { AuthService } from './../../../../services/auth.service';

declare const $: any;

@Injectable({
    providedIn: 'root'
})

export class ProductIdFieldService {

    data: any = []
    options: any;
    selectElement!: ElementRef;
    constructor(private authService: AuthService) { }

    get divModal(){
        const modalElement = this.selectNative.closest('modal')
        return modalElement?.firstChild
    }

    get selectNative(): HTMLElement{
        return this.selectElement.nativeElement
    }

    make(selectElement: ElementRef){
        this.selectElement = selectElement
        this.data = [
            { id: 1, name: 'Laravel' }
        ]
        this.options = {
            dropdownParent: $(this.divModal)
        }
    }
}