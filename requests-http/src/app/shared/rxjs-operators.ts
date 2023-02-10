import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'
import { filter, map, pipe, tap } from 'rxjs'

export function filterResponse<T>() {
  return pipe(
    uploadProgress(progress => {
      console.log('progress', progress)
      progress = progress
    }),
    filter((event: any) => event.type === HttpEventType.Response),
    map((resposta: HttpResponse<T>) => resposta.body)
  )
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / (event.total!)))
    }
  })
}
