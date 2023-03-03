import { AppMaterialModule } from './../../../shared/app-material/app-material.module'
import { CoursesService } from './../../services/courses.service'
import { CoursesModule } from './../../courses.module'
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { CoursesComponent } from './courses.component'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

const expectedUrl = `/api/courses`

describe('CoursesComponent', () => {
  let component: CoursesComponent
  let fixture: ComponentFixture<CoursesComponent>

  let coursesSerice: CoursesService
  let controller: HttpTestingController

  let matDialog: MatDialog

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      providers: [
        CoursesModule,
        { provide: ActivatedRoute, useValue: { params: { id: 1 } } },
        AppMaterialModule,
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, userValue: {} }
      ],
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
