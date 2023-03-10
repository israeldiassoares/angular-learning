import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: [ './poc-base.component.scss' ]
})
export class PocBaseComponent implements OnInit {
  /** SEMPRE SE DESINSCREVA DOS OBSERVABLES */
  @Input() nome: string
  @Input() valor: string | Observable<string> | null
  @Input() estilo: string

  constructor() {
    this.nome = ''
    this.valor = ''
    this.estilo = ''
  }

  ngOnInit(): void {
  }

}
