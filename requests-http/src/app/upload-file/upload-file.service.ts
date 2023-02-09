import { HttpClient, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData()

    files.forEach(file => formData.append('file', file, file.name))

    //Modo de criar - Criada request 'na mão' com o angular
    // const request = new HttpRequest('POST', url, formData, )
    // return this.http.request(request)
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    })
    //observe reporta todos os eventos http que está ocorrendo
    //reportProgress true para exibir o progresso do download/upload
  }

}
