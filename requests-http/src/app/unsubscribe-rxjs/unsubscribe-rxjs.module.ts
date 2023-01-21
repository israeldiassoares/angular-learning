import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocComponent } from './componentes/poc/poc.component';
import { PocAsyncComponent } from './componentes/poc/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc/poc-take.component';
import { PocUnsubComponent } from './componentes/poc/poc-unsub.component';



@NgModule({
  declarations: [
    PocBaseComponent,
    UnsubscribePocComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UnsubscribeRxjsModule { }
