import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [ './upload-file.component.css' ]
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChange(event: Event) {
    console.log('Evento', event)
    let selectedFiles = <FileList>(event.target as HTMLInputElement).files

    const fileNames = []

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[ i ].name)
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ')
  }

}
