import { Observable, map } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EstadoBr } from '../models/estado-br'

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getDropDownBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/estadosbr.json').pipe(map(
      response => response
    ))


  }

}
