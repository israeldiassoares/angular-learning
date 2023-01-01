import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { map } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: [ './data-form.component.scss' ]
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.formulario = new FormGroup({})
  }

  ngOnInit(): void {
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
      })

    })
    console.log('frm', this.formulario)
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

    cep.replace(/\D/g, '')

    //Verifica se campo cep possui valor informado.
    if (cep != '') {

      // Expressão regular para validar o CEP.
      let validaCEP = /^[0-9]{8}$/

      //Valida o formato do CEP.
      if (validaCEP.test(cep)) {

        this.resetaDadosForm()

        this.http.get(`//viacep.com.br/ws/${cep}/json`).pipe(map((dados: any) => dados))
          .subscribe(dados => { this.populaDadosForm(dados) })
      }
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
