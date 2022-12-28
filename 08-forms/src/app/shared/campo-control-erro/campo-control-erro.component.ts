
import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: [ './campo-control-erro.component.scss' ]
})
export class CampoControlErroComponent implements OnInit {

  @Input() mostrarErro?: boolean
  @Input() mensagemErro: string

  constructor() {
    this.mostrarErro = false
    this.mensagemErro = ''
  }

  ngOnInit(): void {
  }

}
