import { Subject } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: [ './confirm-modal.component.scss' ]
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string = ''
  @Input() msgBody: string = ''
  @Input() cancelText = 'Cancelar'
  @Input() okText = "Sim"

  confirmResult: Subject<boolean>

  constructor(private bsModalRef: BsModalRef) {
    this.confirmResult = new Subject
  }

  ngOnInit(): void {
    this.confirmResult = new Subject()
  }

  onConfirm() {
    this.confirmAndClose(true)
  }

  onClose() {
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value)
    this.bsModalRef.hide()
  }
}
