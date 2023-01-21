import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc',
  template: `
  <app-poc-base [nome]="nome"
  [valor]="valor" estilo="bg-danger">
  </app-poc-base>
  `
})
export class PocComponent implements OnInit {

  nome = "Componente sem unsubscribe"
  valor: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
