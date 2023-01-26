import { ActivatedRoute } from '@angular/router'
import { AlertModalService } from './../../shared/alert-modal.service'
import { CursosService } from './../cursos-lista/cursos.service'
import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'

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

    this.route.params.subscribe(
      (params: any) => {
        const id = params[ 'id' ]
        console.log('id', id)
        const curso$ = this.service.loadById(id)
        curso$.subscribe(curso => {
          this.updateForm(curso)
        })
      }
    )

    this.form = this.formBuilder.group({
      id: [ null ],
      nome: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(250) ] ]
    })
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string): ValidationErrors | null | undefined {
    return this.form.get(field)?.errors
  }

  onSubmit() {
    this.submitted = true
    console.log(this.form.value)
    if (this.form.valid) {
      console.log('submit')
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Criado com sucesso")
          this.location.back()
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente.'),
        () => console.log('request completo')
      )
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

}
