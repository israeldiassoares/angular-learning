import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'



@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports:[
    AlertModalComponent
  ]
})
export class SharedModule { }
