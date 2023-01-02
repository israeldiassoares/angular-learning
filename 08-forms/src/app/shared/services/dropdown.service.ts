import { Observable, map } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EstadoBr } from '../models/estado-br'
import { Tecnologias } from '../models/tecnologias'

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

  getCargos() {
    return [
      { nome: 'Dev', nivel: "Junior", desc: "DEV Jr" },
      { nome: 'Dev', nivel: "Pleno", desc: "DEV Pl" },
      { nome: 'Dev', nivel: "Senior", desc: "DEV Sr" }

    ]
  }

  getTecnologias(): Tecnologias[] {
    return [
      { nome: 'java', desc: "Java" },
      { nome: 'javascript', desc: "JavaScript" },
      { nome: 'php', desc: "PHP" },
      { nome: 'ruby', desc: "Ruby" }
    ]
  }

}
