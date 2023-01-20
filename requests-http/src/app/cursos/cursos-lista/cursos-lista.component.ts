import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service'
import { Curso } from './curso'

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  cursos: Curso[]

  constructor(private service: CursosService) {
    this.cursos = []
   }

  ngOnInit(): void {
    this.service.list()
    .subscribe((dados: Curso[]):Curso[] => this.cursos = dados)
  }

}
