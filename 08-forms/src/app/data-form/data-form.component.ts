import { Component, OnInit } from '@angular/core'
import { EMPTY, Observable, distinctUntilChanged, map, switchMap, tap } from 'rxjs'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { VerificaEmailServiceService } from './services/verifica-email-service.service'
import { FormValidations } from './../shared/services/form-validations'
import { Cargos } from './../shared/models/cargos'
import { ConsultaCepService } from './../shared/services/consulta-cep.service'
import { DropdownService } from './../shared/services/dropdown.service'
import { HttpClient } from '@angular/common/http'
import { EstadoBr } from './../shared/models/estado-br'
import { Tecnologias } from '../shared/models/tecnologias'
import { BaseFormComponent } from './../shared/base-form/base-form.component'
import { Cidade } from '../shared/models/cidade'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: [ './data-form.component.scss' ]
})
//Adicionado herança para baseFormComponent centralizando base de classe
export class DataFormComponent extends BaseFormComponent implements OnInit {


  // formulario: FormGroup
  estados: EstadoBr[]
  cidades: Cidade[]
  // estados: Observable<EstadoBr[]>
  cargos: Cargos[]
  tecnologias: Tecnologias[]
  newsletterOp: any[]

  frameworks = [ "Angular", "React", "Vue", "Sencha" ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmail: VerificaEmailServiceService
  ) {
    //Add method super para acessar dados da classe herdada
    super()
    this.formulario = new FormGroup({})
    // this.estados = this.dropdownService.getEstadosBr()
    this.estados = []
    this.cidades = []
    this.cargos = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
    this.newsletterOp = []
  }


  override ngOnInit(): void {

    // this.verificaEmail.verificarEmail('email@email.com').subscribe()


    // this.estados = this.dropdownService.getEstadosBr()
    this.dropdownService.getEstadosBr().subscribe(
      dados => this.estados = dados
    )
    this.cargos = this.dropdownService.getCargos()
    this.newsletterOp = this.dropdownService.getNewsletter()
    // this.dropdownService.getEstadosBr()
    //   .subscribe(
    //     dados => { this.estados = dados; console.log(dados) }
    //   )
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })
    this.formulario = this.formBuilder.group({
      nome: [ null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)

      ] ],
      email: [ null, [ Validators.required, Validators.email ], this.validarEmail.bind(this) ],
      confirmarEmail: [ null, [ FormValidations.equalsTo('email') ] ],
      endereco: this.formBuilder.group({
        cep: [ null, [ Validators.required, Validators.minLength(8), FormValidations.cepValidator ] ],
        numero: [ null, [ Validators.required ] ],
        complemento: [ null ],
        rua: [ null, [ Validators.required ] ],
        bairro: [ null, [ Validators.required ] ],
        cidade: [ null, [ Validators.required ] ],
        estado: [ null, [ Validators.required ] ]
      }),
      cargo: [ null ],
      tecnologias: [ null ],
      newsletter: [ 's' ],
      termos: [ null, Validators.pattern('true') ],
      frameworks: this.buildFrameworks()
    })

    this.formulario?.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario?.get('endereco.cep')?.value)
          : EMPTY
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {})

    // this.dropdownService.getCidades(8).subscribe(console.log)
    this.formulario
      .get('endereco.estado')
      ?.valueChanges.pipe(
        tap((estado) => console.log('Novo estado: ', estado)),
        map((estado) => this.estados.filter((e) => e.sigla === estado)),
        map((estados: any[]) =>
          estados && estados.length > 0 ? estados[ 0 ].id : EMPTY
        ),
        switchMap((estadoId: number) =>
          this.dropdownService.getCidades(estadoId)
        ),
        tap(console.log)
      )
      .subscribe((cidades) => (this.cidades = cidades))
  }
  //Padrao BuildAlguma coisa
  buildFrameworks() {
    const values = this.frameworks.map(v =>
      new FormControl(false)
    )

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1))
    // return [
    //   new FormControl(false), //Angular
    //   new FormControl(false), //React
    //   new FormControl(false), //Vue
    //   new FormControl(false) //Sancha
    // ]
  }

  pegarFrameworksControls() {
    return this.formulario?.get('frameworks') ? (<FormArray>this.formulario?.get('frameworks')).controls : null
  }

  setarTecnologia(): void {
    this.formulario?.get('tecnologias')?.setValue([ 'java', 'javascript', 'php' ])
  }

  setarCargo(): void {
    const cargo = { nome: 'Dev', nivel: "Pleno", desc: "DEV Pl" }
    this.formulario?.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }
  override submit() {
    let valueSubmit = Object.assign({}, this.formulario?.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: string, i: number) => v ? this.frameworks[ i ] : null).filter((v: null) => v !== null)
    })
    console.log('Fruame ', valueSubmit)

    this.http.post('https://httpbin.org/post',
      JSON.stringify(valueSubmit))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados)
        this.resetarFormulario()
      },
        (error: any) => alert('errooo')
      )
  }

  consultaCEP() {

    let cep = this.formulario?.get('endereco.cep')?.value

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.pipe().subscribe(dados => { this.populaDadosForm(dados) })
    }
  }

  populaDadosForm(dados: any) {

    this.formulario?.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })
  }

  resetaDadosForm() {
    this.formulario?.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    })
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmail.verificarEmail(formControl.value).pipe(
      map(emailExiste => emailExiste ? { emailInvalido: true } : null)
    )
  }

}
