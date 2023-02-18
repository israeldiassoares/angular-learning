import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { CoursesService } from '../services/courses.service';
import { Course } from './../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ]
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>
  displayedColumns = [ 'name', 'category' ]
  dataSource: any = []

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog) {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos.")

          //of retorna um observable de array vazio
          return of([])
        })
      )
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  ngOnInit() {
  }

}
