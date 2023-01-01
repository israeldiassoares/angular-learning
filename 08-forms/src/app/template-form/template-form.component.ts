import { ConsultaCepService } from './../shared/services/consulta-cep.service'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: [ './template-form.component.scss' ]
})
export class TemplateFormComponent implements OnInit {

  usuario: any

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {
    this.usuario = {
      nome: null,
      email: null
    }
  }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    console.log('formulario ', form)


    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).pipe(map(res => res)).subscribe(
      dados => console.log(dados)
    )

  }
  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: string, form: any) {
    cep = cep.replace(/\D/g, '')

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.pipe().subscribe(dados => { this.populaDadosForm(dados, form) })
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    /*
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        cep: dados.cep,
        numero: null,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
    */
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
    console.log(formulario, dados)
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
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
