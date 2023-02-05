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

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.')
  }

  onClose() {
    this.bsModalRef.hide()
  }
  onConfirm() {
    
  }
}
