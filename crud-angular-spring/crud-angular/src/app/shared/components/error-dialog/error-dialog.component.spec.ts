import { AppMaterialModule } from './../../app-material/app-material.module'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { ErrorDialogComponent } from './error-dialog.component'

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent
  let fixture: ComponentFixture<ErrorDialogComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDialogComponent ],
      imports: [ AppMaterialModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(ErrorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
