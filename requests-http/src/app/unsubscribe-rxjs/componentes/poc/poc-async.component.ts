import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc-async',
  template: `
  <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-success">
  </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit {

  nome: string = "Componente com Async"
  valor: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
