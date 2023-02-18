import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppMaterialModule } from '../shared/app-material/app-material.module'
import { CoursesRoutingModule } from './courses-routing.module'
import { CoursesComponent } from './courses/courses.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [ CoursesComponent ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    MatProgressSpinnerModule
  ]
})

export class CoursesModule { }
