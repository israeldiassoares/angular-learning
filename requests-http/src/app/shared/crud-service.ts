import { Observable, delay, take, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL: string) { }
  //Read
  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      )
  }

  //Read by ID
  loadById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1))
  }
  //Create
  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1))
  }
  //Update
  private update(record: T) {
    return this.http.put(`${this.API_URL}/${record[ 'id' ]}`, record).pipe(take(1))
  }
  // save
  save(record: T) {
    return record[ 'id' ] ? this.update(record) : this.create(record)
  }
  //Delete
  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1))
  }

}
