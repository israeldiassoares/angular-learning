import { Observable, tap } from 'rxjs'
import { EnviarValorService } from './../../enviar-valor.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-poc-async',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor$ | async" estilo="bg-success">
  </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  nome: string = "Componente com Async"
  valor$: Observable<string>
  constructor(private service: EnviarValorService) {
    this.valor$ = new Observable
   }

  ngOnInit(): void {
    this.valor$ = this.service.getValor().pipe(
      tap(v => console.log(this.nome, v))
    )
  }
  ngOnDestroy(): void {
  }

}
