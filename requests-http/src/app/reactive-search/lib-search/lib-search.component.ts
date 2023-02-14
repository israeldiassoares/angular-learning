import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs'
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
  readonly FIELDS = `filename,description,version,github`


  constructor(private http: HttpClient) {
    this.results$ = new Observable()
    this.total = 0
  }

  ngOnInit(): void {
    //retorna observable e retorna cada mudanca que ocorre no campo
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length >= 3),
      debounceTime(200),
      distinctUntilChanged(),
      // tap(value => console.log(value)),
      //Transforma em um outro observable, cancela a ultima requisicao que nao foi completada e foca apenas em receber a ultima
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((response: any) => this.total = response.total),
      map((res: any)=> res.results)
    )
  }
  //TODO criar um checkbox visual para usuario filtrar os campos a ser mostrado
  onSearch() {
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
        fields: this.FIELDS
      }
      //criacao de parametros dinamico
      let params = new HttpParams()
      params = params.set('search', value)
      params = params.set('fields', this.FIELDS)
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
