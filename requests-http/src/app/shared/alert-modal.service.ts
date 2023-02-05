import { Injectable } from '@angular/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { AlertModalComponent } from './alert-modal/alert-modal.component'
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component'


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

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, typeAlert: AlertTypes, dismissTimeout?: number) {
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    modalRef.content!.typeAlert = typeAlert
    modalRef.content!.message = message

    if (dismissTimeout) {
      setTimeout(() => modalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER, 3000)
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000)
  }

  showConfirm(title: string, msg: string, okText?: string, cancelText?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent)
    bsModalRef.content.title = title
    bsModalRef.content.msg = msg
    if (okText) {
      bsModalRef.content.okText = okText
    }
    if(cancelText) {
      bsModalRef.content.cancelText = cancelText
    }
  }
}
