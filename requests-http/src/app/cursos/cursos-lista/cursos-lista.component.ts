import { AlertModalService } from './../../shared/alert-modal.service'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { EMPTY, Observable, catchError, Subject, map, switchMap, tap } from 'rxjs'

import { CursosService } from './cursos.service'
import { Curso } from './curso'

// import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: [ './cursos-lista.component.scss' ],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit, OnDestroy {
  // cursos: Curso[]
  cursos$: Observable<Curso[]>
  //Subject é um observable que consegue emitir valores no RXJS
  error$ = new Subject<boolean>()

  // deleteModalRef: BsModalRef;


  @ViewChild('deleteModal', { static: true }) deleteModal: any

  cursoSelecionado: Curso = { id: 0, nome: '' }

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    // private modalService: BsModalService
  ) {
    // this.cursos = []
    this.cursos$ = new Observable<Curso[]>
    // this.deleteModalRef = new BsModalRef<unknown>
  }

  ngOnInit(): void {
    this.onRefresh()
  }
  /* Usa-se o | sync para não se inscrever em eventos .subscribe() deixando de utilizar composição */
  ngOnDestroy(): void {
    //precisa se desinscrever do subscribe
    this.service.list().subscribe().closed
  }
  //migrando o codigo de onInit para onRefresh centralizando o código
  onRefresh() {
    /*Criado o servico e inscrito .subscribe() no metodo list  */
    // this.service.list()
    // .subscribe((dados: Curso[]): Curso[] => this.cursos = dados /*feito o subscribe manual para guardar os dados na variavel curso*/)
    this.cursos$ = this.service.list()
      .pipe(
        catchError(
          error => {
            console.error(error)
            //emitindo um valor para o error que é de next(true), sendo capturado esse valor no pipe async no template
            // this.error$.next(true)
            this.handlerError()
            return EMPTY
            // || return of()
          }
        )
      )
    /* dentro do subscribe conseguimos colocar 3 tipos de lógica:
    1ª caso de sucesso
    2ª Erro que foi disparado
    3ª Quando é/está completo (não vai + emitir valor)*/
    this.service.list().pipe(
      // map(), possibilidades grandes de utilizar manipuladores
      // tap(),
      // switchMap(),
      /* Ou utilizar o pipe para utilizar qualquer operador do rxjs e manipular tudo, maneiras diversas para escrever o msm código, ou subscribe ou pipes colocar o catch error como ultimo operador do pipe, assim ocorrenedo qualquer erro durante a mannipulacao consegue capturar e aplicar alguma logica utilizando o catcherror no pipe*/
      catchError(error => EMPTY)
    )
      .subscribe(
        dados => { console.log('caso de sucesso', dados) },
        error => { console.log('caso de erro', error) },
        () => console.log("Observable Completo")
      )

  }

  handlerError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente + tarde !')
    //refatorado para componente generico com chamada dinamica, código acima
    // const modalRef = this.modalService.open(AlertModalComponent);
    // modalRef.componentInstance.typeAlert = 'danger';
    // modalRef.componentInstance.message = 'Erro ao carregar cursos. Tente novamente + tarde !'
  }

  onEdit(id: number) {
    this.router.navigate([ 'editar', id ], { relativeTo: this.route })
  }
  onDelete(curso: Curso) {
    this.cursoSelecionado = curso

    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })

  }

  onConfirmDelete(curso: Curso) {
    this.cursoSelecionado = curso

    this.service.remove(this.cursoSelecionado.id)
      .subscribe(
        success => {
          this.onRefresh()
            // this.deleteModalRef.hide()
        },
        error => {
          this.alertService.showAlertDanger("Erro ao remover o curso, Tente novamente!")
            // this.deleteModalRef.hide()
        }
      )
  }
  onDeclineDelete() {
    // this.deleteModalRef.hide()
  }

}
