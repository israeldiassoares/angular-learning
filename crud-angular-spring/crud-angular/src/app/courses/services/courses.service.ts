import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { first, Observable, tap } from 'rxjs'

import { Course } from './../model/course'

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
        // tap(courses => console.log('cursos', courses))
      )
  }

  listById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  save(record: Partial<Course>): Observable<Course> {
    return record._id ? this.update(record) : this.create(record)
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, record).pipe(first())
  }

  private update(course: Partial<Course>): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course).pipe(first())
  }

  delete(id: string): Observable<Course> {
    console.log('to no servicos', id)
    // return this.httpClient.delete<Course>(`${this.API}/${id}`).pipe(first())
    return this.httpClient.delete<Course>(`${this.API}/${id}`).pipe(first())
  }


}
