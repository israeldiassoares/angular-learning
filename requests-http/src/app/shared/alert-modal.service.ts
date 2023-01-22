import { Injectable } from '@angular/core'

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AlertModalComponent } from './alert-modal/alert-modal.component'

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  private showAlert(message: string, typeAlert: AlertTypes) {
    const modalRef = this.modalService.open(AlertModalComponent)
    modalRef.componentInstance.typeAlert = typeAlert
    modalRef.componentInstance.message = message
  }

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS)
  }
}
