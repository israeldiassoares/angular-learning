import { Component, OnInit } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup

  constructor() {

  }

  ngOnInit(): void {
  }

  abstract submit(): any

  onSubmit() {
    if (this.formulario?.valid) {
      this.submit()
    } else {
      console.log('formulário inválido')
      this.verificaValidacaoForm(this.formulario!)

    }
  }
  //movido do data-form-component methods genericos centralizando em uma unica classe que será extendida quando necessário utilizar os methods

  // TODO - fazer refactory de campos para aumentar a performace diminuindo o custo computacional
  verificaValidacaoForm(formGroup: FormGroup | FormArray) {
    Object.keys(this.formulario!.controls).forEach((campo) => {
      console.log('campo', campo)
      const controle = this.formulario?.get(campo)
      controle?.markAllAsTouched()
      controle?.markAsDirty()

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacaoForm(controle)
      }
    })
  }

  resetarFormulario() {
    this.formulario?.reset()
  }
  verificaValidTouched(campo: string) {
    return !this.formulario?.get(campo)?.valid && this.formulario?.get(campo)?.touched
  }

  verificaRequired(campo: string) {
    return (
      this.formulario?.get(campo)?.hasError('required') &&
      (this.formulario?.get((campo))?.touched || this.formulario?.get(campo)?.dirty)
    )
  }

  verificaEmailInvalido(): boolean {
    let campoEmail = this.formulario?.get('email')
    return campoEmail!.errors ? (campoEmail!.errors![ 'email' ] && campoEmail?.touched) : null
  }

  aplicarCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }
}
