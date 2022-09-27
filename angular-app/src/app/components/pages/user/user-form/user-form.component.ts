import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './user-field-options';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input()
  form!: FormGroup

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.changeRef.detectChanges()
  }

  get fieldOptions(): any {
    return fieldsOptions
  }

  get field() {
    return this.fieldOptions
  }


}
