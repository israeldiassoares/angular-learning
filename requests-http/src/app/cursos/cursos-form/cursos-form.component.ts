import { ActivatedRoute } from '@angular/router'
import { AlertModalService } from './../../shared/alert-modal.service'
import { CursosService } from './../cursos-lista/cursos.service'
import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { map, switchMap } from 'rxjs'

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: [ './cursos-form.component.css' ]
})
export class CursosFormComponent implements OnInit {

  form: FormGroup
  submitted: boolean

  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({})
    this.submitted = false
  }

  ngOnInit() {
    //let registro = null //ERrado

    //Trabalhando com observable nao temos uma certeza de quando o código será executado
    //Codigo assincrono, nao sendo possivel iniciar valores dentro delea
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params[ 'id' ]
    //     console.log('id', id)
    //     const curso$ = this.service.loadById(id)
    //     curso$.subscribe(curso => {
    //       // registro = curso //correto é utilizar o subscribe e utilizar o patchvalue para modificar o form
    //       this.updateForm(curso)
    //     })Codigo movido para refatoração, para diminuir a complexidade e
    //   } melhoria
    // )
    //inicializar com null pois pode demorar alguns MS para executar|popular a variavel no codigo assincrono
    // console.log('registro ', registro)
    //Para a parte do angular devemos inicializar o formulario no constrc ou no ngOnInit

    //subscrib in route.params angular automaticamente faz o unsubscribe o angular monitora
    //Passado todo os dados para a variável curso e feito o refac no form
    // this.route.params.pipe(
    //   map((params: any) => params[ 'id' ]),
    //   switchMap(id => this.service.loadById(id))
    //   // switchMap(cursos => obterAulas)
    // )
    //   .subscribe(curso => this.updateForm(curso))

    //concatMap -> a ordem da requisição importa
    // mergeMap -> nao importa a ordem de requisição
    // exhaustMap -> vai fazer a requisicao e obtem a resposta antes da segunda tentativa, sincronamente req, espera a resp e parte para a segunda chamada comum em casos de login (CRUD)
    const curso = this.route.snapshot.data[ 'curso' ]

    this.form = this.formBuilder.group({
      id: [ curso.id ],
      nome: [ curso.nome, [ Validators.required, Validators.minLength(3), Validators.maxLength(250) ] ]
    })
  }

  //conteúdo do curso vai estar na variável curso que foi passado via snapshot da rota
  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  hasError(field: string): ValidationErrors | null | undefined {
    return this.form.get(field)?.errors
  }

  onSubmit() {
    this.submitted = true
    console.log(this.form.value)
    if (this.form.valid) {
      console.log('submit')

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Curso atualizado com sucesso!")
          this.location.back()
        },
        error => {
          this.modal.showAlertDanger('Error ao atualizar curso, tente novamente !'),
            () => console.log('update completo')
        }
      )

      /** refatorado, conforme acima, logica centralziada em cursos services
    if (this.form.value.id) {
      //Update
      this.service.update(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Curso atualizado com sucesso!")
          this.location.back()
        },
        error => this.modal.showAlertDanger('Error ao atualizar curso, tente novamente !'),
        () => console.log('update completo')
      )
    } else {
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Criado com sucesso")
          this.location.back()
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente.'),
        () => console.log('request completo')
      )
    }
     */
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

}
