import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldOptions from './product-field-options';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  form!: FormGroup

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.changeRef.detectChanges()
  }

  get fieldOptions(): any {
    return fieldOptions
  }

  get field() {
    return this.fieldOptions
  }

}
