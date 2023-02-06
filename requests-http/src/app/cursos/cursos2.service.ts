import { Curso } from './curso';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

constructor() {
  super()
}

}
