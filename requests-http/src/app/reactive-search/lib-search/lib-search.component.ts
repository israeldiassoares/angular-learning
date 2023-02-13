import { HttpClient } from '@angular/common/http'
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

  onSearch() {
    console.log(this.queryField.value)
    //TODO criar servico para chamadas
    this.results$ = this.http.get(this.SEARCH_URL + '?search=angular&fields=filename,description,version,github').pipe(
      // TODO Criar interface para response
      tap((res: any) => { this.total = res?.total }),
      map(res => res.results)
    )
  }

}
