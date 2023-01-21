import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-poc-unsub',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-secondary">
  </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit {

  nome: string = "Componente com unsubscribe"
  valor: string = ' '
  constructor() { }

  ngOnInit(): void {
  }

}
