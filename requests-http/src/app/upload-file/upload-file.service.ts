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

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      reportProgress: true
      //content-lengh
      //precisa setar o header do content-lengh no back end, o agular nao tem bola de cristal para adinhar e setar o valor do progresso
    })
  }
  handleFile(res: any, fileName: string) {
    const file = new Blob([ res ], {
      type: res.type
    })

    //IE
    if ((window?.navigator as any).msSaveOrOpenBlob) {
      (window?.navigator as any).msSaveOrOpenBlob(file)
      return
    }

    //Firefox support


    const blob = window.URL.createObjectURL(file)

    const link = document.createElement("a")
    link.href = blob
    link.download = `${fileName}`
    //suporte firefox
    // link.click()
    link.dispatchEvent(new MouseEvent('click',
      {
        bubbles: true,
        cancelable: true,
        view: window
      }))
    //firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob)
      link.remove()
    }, 200)
  }
}
