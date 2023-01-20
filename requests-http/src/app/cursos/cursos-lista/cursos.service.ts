import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap, delay } from 'rxjs';
import { Curso } from './curso'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`
  constructor(private http: HttpClient) { }

  list():Observable<Curso[]>{
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    )
  }
}
