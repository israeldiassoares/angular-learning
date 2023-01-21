import { take, tap } from 'rxjs'
import { EnviarValorService } from './../../enviar-valor.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
@Component({
  selector: 'app-poc-take',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-info">
    </app-poc-base>
    `
})
/*Faz uma requisição vai ao servidor, retornou e acabou a conexão com o servidor */
export class PocTakeComponent implements OnInit, OnDestroy {

  nome: string = "Componente Take"
  valor: string = ''

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.service.getValor().pipe(tap(v => console.log(this.nome, v)),
    /*Take faz a subinscricao no servidor http sem backend reativo, retornou o response e acabou a conexão/é encerrado */
      take(1)
    ).subscribe(novoValor => this.valor = novoValor)
  }
  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`)
  }

}
