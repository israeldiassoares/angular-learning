import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

//curso index redireciona para path cursos e no path cursos carrega o path filho via import
const routes: Routes = [
  { path: 'rxjs-poc', loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(c => c.UnsubscribeRxjsModule) },
  { path: '', pathMatch: 'full', redirectTo: 'busca-reativa' },
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(c => c.CursosModule) },
  { path: 'upload', loadChildren: () => import('./upload-file/upload-file.module').then(u => u.UploadFileModule) },
  { path: 'busca-reativa', loadChildren: () => import('./reactive-search/reactive-search.module').then(br => br.ReactiveSearchModule) }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
