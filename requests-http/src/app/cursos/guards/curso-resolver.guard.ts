import { CursosService } from '../cursos.service'
import { Curso } from '../curso'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private service: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    //validação Vai ser utilizado para edição e para criação de novos cursos
    if (route.params && route.params[ 'id' ]) {
      //Se objeto existe vai até o servico e busca o curso q esta no servidor para fazer a atualização.
      return this.service.loadById(route.params[ 'id' ])
    }

    //of rxjs retorna um observable apartir de um objeto
    return of({
      id: NaN,
      nome: ''
    })
  }

}
