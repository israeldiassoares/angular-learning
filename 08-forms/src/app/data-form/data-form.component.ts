import { ConsultaCepService } from './../shared/services/consulta-cep.service'
import { DropdownService } from './../shared/services/dropdown.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable, map } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { EstadoBr } from './../shared/models/estado-br'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: [ './data-form.component.scss' ]
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup
  // estados: EstadoBr[]
  estados: Observable<EstadoBr[]>
  cargos: any[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) {
    this.formulario = new FormGroup({})
    this.estados = this.dropdownService.getDropDownBr()
    this.cargos = this.dropdownService.getCargos()
  }

  ngOnInit(): void {
    this.estados = this.dropdownService.getDropDownBr()
    this.cargos = this.dropdownService.getCargos()

    // this.dropdownService.getDropDownBr()
    //   .subscribe(
    //     dados => { this.estados = dados; console.log(dados) }
    //   )
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })
    this.formulario = this.formBuilder.group({
      nome: [ null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ] ],
      email: [ null, [ Validators.required, Validators.email ] ],

      endereco: this.formBuilder.group({
        cep: [ null, [ Validators.required, Validators.minLength(8) ] ],
        numero: [ null, [ Validators.required ] ],
        complemento: [ null ],
        rua: [ null, [ Validators.required ] ],
        bairro: [ null, [ Validators.required ] ],
        cidade: [ null, [ Validators.required ] ],
        estado: [ null, [ Validators.required ] ]
      }),
      cargo: [ null ]
    })
  }
  setarCargo() {
    const cargo = { nome: 'Dev', nivel: "Pleno", desc: "DEV Pl" }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post',
        JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe(dados => {
          console.log(dados)
          this.resetarFormulario()
        },
          (error: any) => alert('errooo')
        )
    } else {
      console.log('formulário inválido')
      this.verificaValidacaoForm(this.formulario)

    }
  }

  verificaValidacaoForm(formGroup: FormGroup) {
    Object.keys(this.formulario.controls).forEach((campo) => {
      console.log('campo', campo)
      const controle = this.formulario.get(campo)
      controle?.markAllAsTouched()

      // if (controle instanceof FormGroup) {
      //   this.verificaValidacaoForm(controle)
      // }
    })
  }

  resetarFormulario() {
    this.formulario.reset()
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido(): boolean {
    let campoEmail = this.formulario.get('email')
    return campoEmail!.errors ? (campoEmail!.errors![ 'email' ] && campoEmail?.touched) : null
  }

  aplicarCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep')?.value

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.pipe().subscribe(dados => { this.populaDadosForm(dados) })
    }
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
  }
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    })
  }
}
