import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: [ './template-form.component.scss' ]
})
export class TemplateFormComponent implements OnInit {

  usuario: any

  constructor() {
    this.usuario = {
      nome: null,
      email: null
    }
  }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    console.log('formulario ', form)
    
  }
}
