import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component'

const routes: Routes = [
  { path: '', component: UnsubscribePocComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UnsubscribeRxjsRountingModule { }
