import { MatSnackBar } from '@angular/material/snack-bar'
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, Observable, of, tap } from 'rxjs'
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component'

import { CoursesService } from '../../services/courses.service'
import { Course } from '../../model/course'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ]
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null
  dataSource: any = []

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh()
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  ngOnInit() {
  }

  onAdd() {
    this.router.navigate([ 'new' ], { relativeTo: this.route })
  }

  onEdit(course: Course) {
    this.router.navigate([ 'edit', course._id ], { relativeTo: this.route })
  }

  refresh() {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos.")

          //of retorna um observable de array vazio
          return of([])
        })
      )
  }

  onDelete(course: Course) {
    this.onConfirm(course, 'Exclusão registro', "Confirmar exclusão de:")
  }
  // this.onConfirm(course, 'Quer Deletar', 'vai deletar mesmo ?');

  onConfirm(course: Course, title: string, msg: string) {
    const dialogConfirm = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `${title} ${course.name}`,
        name: msg
      }
    })

    dialogConfirm.afterClosed().subscribe(
      (result: boolean) => {
        if (result) {
          this.coursesService.delete(course._id).subscribe(
            () => {
              this.refresh()
              this.snackBar
                .open("Curso removido com sucesso",
                  '',
                  {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  })
            },
            () => this.onError("Erro ao excluir registro")
          )
        }
      }
    )
  }


}
