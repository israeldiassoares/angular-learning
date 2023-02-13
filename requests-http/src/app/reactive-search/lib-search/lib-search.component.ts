import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map, tap } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: [ './lib-search.component.scss' ]
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl()
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
  results$: Observable<any>
  total: number

  constructor(private http: HttpClient) {
    this.results$ = new Observable()
    this.total = 0
  }

  ngOnInit(): void {
  }
  //TODO criar um checkbox visual para usuario filtrar os campos a ser mostrado
  onSearch() {
    const fields = `filename,description,version,github`
    let value = this.queryField.value
    if (value && (value = value.trim()) !== '') {
      //http tradicional
      // this.results$ = this.http.get(this.SEARCH_URL + `?search=${value}&fields=${fields}`).pipe(
      //   // TODO Criar interface para response
      //   tap((res: any) => { this.total = res?.total }),
      //   map(res => res.results)


      //methodo angular com parametros fixos
      const paramsFixo = {
        search: value,
        fields: fields
      }
      //criacao de parametros dinamico
      let params = new HttpParams()
      params = params.set('search', value)
      params = params.set('fields', fields)
      // params.append('novoValor', novoValor)

      //TODO criar servico para chamadas
      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        // TODO Criar interface para response
        tap((res: any) => { this.total = res?.total }),
        map(res => res.results)
      )
    }
  }
}
