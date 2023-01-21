import { Subscription, tap } from 'rxjs'
import { EnviarValorService } from './../../enviar-valor.service'
import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-poc-unsub',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-secondary">
  </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome: string = "Componente com unsubscribe"
  valor: string = ' '
  sub: Subscription[] = []
  //caso tenha varias subscricao da pra fazer com array
  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.sub.push(this.service.getValor().pipe(
      tap(v => console.log(this.nome, v))
    ).subscribe(novoValor => this.valor = novoValor))
  }
  /* Problema de fazer o unsubscribe manual é que estamos fazendo de forma imperativa, não utilizando todo o potencial do rxjs e da programação reativa  */
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
    console.log(`${this.nome} foi destruido`)
  }

}
