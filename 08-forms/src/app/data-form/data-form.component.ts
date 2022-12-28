import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { map } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: [ './data-form.component.scss' ]
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.formulario = new FormGroup({})
  }

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })
    this.formulario = this.formBuilder.group({
      nome: [ null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ] ],
      email: [ null, [ Validators.required, Validators.email ] ]
    })
  }
  onSubmit() {
    console.log(this.formulario.value)
    this.http.post('https://httpbin.org/post',
      JSON.stringify(this.formulario.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados)
        this.resetarFormulario()
      },
        (error: any) => alert('errooo')
      )
  }

  resetarFormulario() {
    this.formulario.reset()
  }
}
