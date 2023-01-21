import { UnsubscribeRxjsComponent } from './unsubscribe-rxjs/unsubscribe-rxjs.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

//curso index redireciona para path cursos e no path cursos carrega o path filho via import
const routes: Routes = [
  { path: '/rxjs-poc', loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(c => c.UnsubscribeRxjsModule) },
  { path: '', pathMatch: 'full', redirectTo: 'cursos' },
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(c => c.CursosModule) }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
