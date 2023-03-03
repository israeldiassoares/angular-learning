import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'

import { CoursesService } from './../../services/courses.service'
import { CourseFormComponent } from './course-form.component'
import { FormBuilder, NonNullableFormBuilder } from '@angular/forms'


describe('CourseFormComponent', () => {
  let component: CourseFormComponent
  let fixture: ComponentFixture<CourseFormComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormComponent ],
      providers: [
        CoursesService,
        FormBuilder,
        { provide: MatSnackBar, userValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { data: [ { path: 'course' } ] } } }
      ],
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  it('should form', () => {
    expect(component.form.setValue({ _id: "1", name: 'Angular', category: 'front-end' }))
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
  })

})
