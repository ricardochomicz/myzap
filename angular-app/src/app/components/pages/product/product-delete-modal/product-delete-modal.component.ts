import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductHttpService } from './../../../../services/http/product-http.service';

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html'
})
export class ProductDeleteModalComponent implements OnInit {

  product!: any

  _productId!: number

  showOverlay = true;

  @ViewChild(ModalComponent) modal!: ModalComponent

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private toastr: ToastrService, private productHttp: ProductHttpService) { }

  ngOnInit(): void {
  }

  @Input()
  set productId(value: number) {
      this._productId = value
      if (this._productId) {
          this.productHttp.get(value)   
              .subscribe({
                  next: (response) => {
                      //@ts-ignore
                      this.product = response.data
                      this.showOverlay = false
                  },
                  error: (error) => {
                      this.toastr.error('Erro ao carregar produtos!', error.status + ' ' + error.statusText);
                  }
              })
      }
  }

  submit() {
      this.productHttp.delete(this._productId)
          .subscribe({
              next: () => {
                  this.onSuccess.emit()
                  this.modal.hide()
              },
              error: (error) => {
                  this.onError.emit(error)
              }
          })
  }

  showModal() {
      this.modal.show()
      this.showOverlay = true
  }

  hideModal($event: any) {
      console.log($event)
  }

}
