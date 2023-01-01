import { HttpClientModule } from '@angular/common/http'
import { DropdownService } from './services/dropdown.service'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormDebugComponent } from './form-debug/form-debug.component'
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component'


@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
