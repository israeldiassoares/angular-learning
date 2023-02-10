import { HttpEvent, HttpEventType, HttpResponse, HttpSentEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UploadFileService } from './../upload-file.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { filterResponse } from 'src/app/shared/rxjs-operators'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [ './upload-file.component.css' ]
})
export class UploadFileComponent implements OnInit, OnDestroy {

  //Estrutura de dados Set faz a filtragem dos arquivos fazendo submiter apenas uma cóppia do registro, não havendo registros duplicados. Caso seja Necessario utilizar array
  files: Set<File>
  progress = 0

  constructor(private service: UploadFileService) {
    this.files = new Set()
  }

  ngOnInit() { }

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
    this.progress = 0
  }

  onUpload() {

    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, '/api/upload')
        .pipe(
          filterResponse()
        )
        .subscribe(response => console.log('uploadConcluido', event))
      // .subscribe(
      //   (event: any) => {
      //     if (event.type === HttpEventType.Response) {
      //       // HttpEventType
      //       console.log('uploadConcluido', event)
      //     } else if (event.type === HttpEventType.UploadProgress) {
      //       const percentDone = Math.round((event.loaded * 100) / (event.total!))
      //       console.log('progresso', percentDone)
      //       this.progress = percentDone
      //     }
      //   })
      //como está usando cors utilizar take(1) nao é funcional, pois o cors faz uma primeira chamada verificando a conexao, e em seguida faz uma segunda chamada aonde realmente passa a informação.
    }
  }

  ngOnDestroy(): void {

  }

}
