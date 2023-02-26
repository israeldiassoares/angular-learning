import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: [ './confirmation-dialog.component.css' ]
})
export class ConfirmationDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, title: string })
    { }
  onConfirm(result: boolean): void {
    this.dialogRef.close(result)
  }

}
