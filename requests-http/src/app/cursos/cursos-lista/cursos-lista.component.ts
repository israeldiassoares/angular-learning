import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { CursosService } from './cursos.service'
import { Curso } from './curso'

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: [ './cursos-lista.component.scss' ],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit, OnDestroy {
  // cursos: Curso[]

  cursos$: Observable<Curso[]>

  constructor(private service: CursosService) {
    // this.cursos = []
    this.cursos$ = new Observable<Curso[]>
  }

  ngOnInit(): void {
    /*Criado o servico e inscrito .subscribe() no metodo list  */
    // this.service.list()
    // .subscribe((dados: Curso[]): Curso[] => this.cursos = dados /*feito o subscribe manual para guardar os dados na variavel curso*/)
    this.cursos$ = this.service.list()
  }
  /* Usa-se o | sync para não se inscrever em eventos .subscribe() deixando de utilizar composição */
  ngOnDestroy(): void{
    //precisa se desinscrever do subscribe
    this.service.list().subscribe().closed
  }

}
