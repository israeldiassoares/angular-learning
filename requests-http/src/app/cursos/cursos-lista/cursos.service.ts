import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap, delay, take } from 'rxjs';
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
  create(curso: string) {
    return this.http.post(this.API, curso).pipe(take(1))
  }
}
