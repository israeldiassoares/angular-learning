import { Subject, takeUntil, tap } from 'rxjs'
import { EnviarValorService } from './../../enviar-valor.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-poc-take-until',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-primary">
  </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {
  nome: string = "Componente take until"
  valor: string = ''
  unsub$ = new Subject()

  constructor(private service: EnviarValorService) { }
  /* mantem viva durante todo o ciclo de vida do componente e é efetuado no fim o desinscricao e o encerramento */
  ngOnInit(): void {
    this.service.getValor().pipe(
      tap(v => console.log(this.nome, v)),
      takeUntil(this.unsub$))
      .subscribe((novoValor: string) => this.valor = novoValor)
  }
  ngOnDestroy(): void {
    //ativa a inscricao nesse observable
    this.unsub$.next((value: string) => console.log(value))
    //evita problema de memory leak
    this.unsub$.complete()
    console.log(`${this.nome} foi destruido`)

  }

}
