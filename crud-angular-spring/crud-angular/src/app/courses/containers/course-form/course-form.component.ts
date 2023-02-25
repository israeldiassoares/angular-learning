import { Course } from './../../model/course'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CoursesService } from '../../services/courses.service'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: [ './course-form.component.scss' ]
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [ '' ],
    name: [ '' ],
    category: [ '' ]
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
}
