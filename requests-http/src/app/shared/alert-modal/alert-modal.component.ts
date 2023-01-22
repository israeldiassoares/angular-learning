import { Component, Input, OnInit } from '@angular/core'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: [ './alert-modal.component.scss' ]
})
export class AlertModalComponent implements OnInit {


  @Input() message: string
  @Input() typeAlert: string

  constructor(public activeModal: NgbActiveModal) {
    this.message = ''
    this.typeAlert = 'success'
  }

  ngOnInit(): void {
  }
  onClose(){
    this.activeModal.close();
  }
}
