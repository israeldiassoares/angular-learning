import { HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UploadFileService } from './../upload-file.service'
import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [ './upload-file.component.css' ]
})
export class UploadFileComponent implements OnInit, OnDestroy {

  //Estrutura de dados Set faz a filtragem dos arquivos fazendo submiter apenas uma cóppia do registro, não havendo registros duplicados. Caso seja Necessario utilizar array
  files: Set<File>
  uploadFile: Observable<HttpEvent<unknown>>

  constructor(private service: UploadFileService) {
    this.files = new Set()
    this.uploadFile = new Observable()
  }

  ngOnInit() {
  }

  onChange(event: Event) {
    console.log('Evento', event)
    let selectedFiles = <FileList>(event.target as HTMLInputElement).files

    const fileNames = []
    this.files = new Set()

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[ i ].name)
      this.files.add(selectedFiles[ i ])
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ')
  }

  onUpload() {
    this.uploadFile = this.service.upload(this.files, 'http://localhost:9000/upload')
    if (this.files && this.files.size > 0) {
      this.uploadFile.subscribe(response => console.log('uploadConcluido', response))
      //como está usando cors utilizar take(1) nao é funcional, pois o cors faz uma primeira chamada verificando a conexao, e em seguida faz uma segunda chamada aonde realmente passa a informação.
    }
  }

  ngOnDestroy(): void {
    // this.onUpload().unsubscribe()
  }

}
