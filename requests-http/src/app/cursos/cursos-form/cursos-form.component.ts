import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: [ './cursos-form.component.css' ]
})
export class CursosFormComponent implements OnInit {

  form: FormGroup
  submitted: boolean

  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({})
    this.submitted = false
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(250) ] ]
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
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

}
