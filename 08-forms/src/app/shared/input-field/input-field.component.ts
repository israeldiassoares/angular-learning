import { Component, Input, OnInit, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'


//Criacao de provider para customizar campo dentro de classe
const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: [ './input-field.component.scss' ],
  providers: [ INPUT_FIELD_VALUE_ACCESSOR ]
})

//implementacao de interface para controlar acesso dos valores dos atributos
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCss: any
  @Input() id: string
  @Input() label: string
  @Input() type = 'text'
  @Input() control: any
  @Input() isReadyOnly: boolean

  //Criando manipulacao do valor
  private innerValue: any
  //metodo get para pegar o valor Encapsulamento
  get value() {
    return this.innerValue
  }
  //methodo set verificando se é valor diferente, caso contrario é inserido a nova informação para innerValue
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v
      this.onChangeCB(v)
      // TODO
    }
  }

  constructor() {
    this.id = ''
    this.label = ''
    this.isReadyOnly = false
  }

  //funcao dumb angular consegue controlar
  onChangeCB: (_: any) => void = () => { }
  onTouchedCB: (_: any) => void = () => { }

  writeValue(v: any): void {
    this.innerValue = v
  }

  registerOnChange(fn: any): void {
    this.onChangeCB = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCB = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadyOnly = isDisabled
  }

  ngOnInit(): void {
  }

}
