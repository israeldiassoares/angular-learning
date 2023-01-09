import { FormValidations } from './../services/form-validations'
import { FormControl } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: [ './error-msg.component.scss' ]
})
export class ErrorMsgComponent implements OnInit {

  // @Input() mostrarErro?: boolean
  // @Input() mensagemErro?: string

  @Input() control: FormControl
  @Input() label: string

  constructor() {
    this.control = new FormControl()
    this.label = ''
  }

  ngOnInit(): void {
  }


  get ErrorMessage() {

    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[ propertyName ])
      }
    }

    return null
  }
}
