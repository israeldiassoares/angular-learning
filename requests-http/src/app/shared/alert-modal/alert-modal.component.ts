import { BsModalRef } from 'ngx-bootstrap/modal'
import { Component, Input, OnInit } from '@angular/core'


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: [ './alert-modal.component.scss' ]
})
export class AlertModalComponent implements OnInit {


  @Input() message: string
  @Input() typeAlert: string

  constructor(public activeModal: BsModalRef) {
    this.message = ''
    this.typeAlert = 'success'
  }

  ngOnInit(): void {
  }
  onClose() {
    this.activeModal.hide()
  }
}
