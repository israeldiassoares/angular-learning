import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Course } from '../model/course'
import { Observable, delay, first, take, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses'

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        //finaliza a inscricação no subscribe assim q receber o retorno do servidor
        first(),
        tap(courses => console.log('cursos', courses))
      )
  }

}
