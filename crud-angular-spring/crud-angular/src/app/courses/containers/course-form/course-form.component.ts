import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'

import { CoursesService } from '../../services/courses.service'
import { Course } from './../../model/course'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: [ './course-form.component.scss' ]
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [ '' ],
    name: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ] ],
    category: [ '', [ Validators.required ] ]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data[ 'course' ]
    this.form.setValue({ _id: course._id, name: course.name, category: course.category })
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(
        data => this.onSuccess("Curso salvo com sucesso"),
        error => this.onError("Erro ao salvar curso")
      )
  }

  onCancel() {
    this.location.back()
  }

  private onSuccess(msg: string) {
    this._snackBar.open(
      msg,
      '',
      { duration: 5000 })
    this.onCancel()
  }

  private onError(msg: string) {
    this._snackBar.open(
      msg,
      '',
      { duration: 5000 })
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName)

    if (field?.hasError('required')) {
      return 'Campo obrigatório'
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors[ 'minlength' ][ 'requiredLength' ] : 3
      return `Deve conter mínimo de ${requiredLength} caracteres`
    }
    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors[ 'maxlength' ][ 'requiredLength' ] : 50

      return `Deve conter máximo de ${requiredLength} caracteres`
    }
    return 'Campo inválido'
  }
}
