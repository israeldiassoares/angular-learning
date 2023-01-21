import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-poc-take',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-info">
  </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit {

  nome: string = "Componente Take"
  valor: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
