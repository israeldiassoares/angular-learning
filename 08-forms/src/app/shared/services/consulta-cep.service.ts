import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient
  ) { }

  consultaCEP(cep: string) {

    cep = cep.replace(/\D/g, '')

    //Verifica se campo cep possui valor informado.
    if (cep !== '') {

      // Expressão regular para validar o CEP.
      let validaCEP = /^[0-9]{8}$/

      //Valida o formato do CEP.
      if (validaCEP.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
      }
    }

    return of({})
  }
}
