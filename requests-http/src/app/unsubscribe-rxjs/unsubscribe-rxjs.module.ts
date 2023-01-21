import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocComponent } from './componentes/poc/poc.component';
import { PocAsyncComponent } from './componentes/poc/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc/poc-take.component';
import { PocUnsubComponent } from './componentes/poc/poc-unsub.component';
import { UnsubscribeRxjsRountingModule } from './unsubscribe-rxjs-rounting.module';



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
    CommonModule,
    /**Precisa fazer a importação do routing module para conseguir fazer o roteamento com o rounting raiz do projeto */
    UnsubscribeRxjsRountingModule
  ]
})
export class UnsubscribeRxjsModule { }
