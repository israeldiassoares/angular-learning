import { Observable, Subject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  //variavel privada que recebe um sujeito de observable de strings
  private emissor$ = new Subject<string>()

  /* Emissor de valor para pegando sempre o próximo item dentro do subject */
  emitirValor(valor: string): void {
    this.emissor$.next(valor)
  }
  /* Tornando o metodo privado daremos acesso apenas para pegar o valor emitido como observable */
  getValor(): Observable<string> {
    return this.emissor$.asObservable()
  }

  constructor() { }
}
