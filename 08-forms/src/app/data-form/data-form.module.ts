import { SharedModule } from './../shared/shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule } from '@angular/forms'
import { DataFormComponent } from './data-form.component'
import { TemplateFormModule } from "../template-form/template-form.module"


@NgModule({
    declarations: [
        DataFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TemplateFormModule,
        SharedModule
    ]
})
export class DataFormModule { }
