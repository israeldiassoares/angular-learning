import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'
import { filter, map, pipe, tap } from 'rxjs'

export function filterResponse<T>() {
  return pipe(
    filter((event: any) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  )
  // return pipe(
  //   uploadProgress((progress: number) => {
  //     console.log('progress', progress)
  //     this.progress = progress
  //   }),
  //   filter((event: any) => event.type === HttpEventType.Response),
  //   map((resposta: HttpResponse<T>) => resposta.body)
  // )
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / (event.total!)))
    }
  })
}
