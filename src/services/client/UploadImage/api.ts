import mime from 'mime-types'
import { v4 as uuid } from 'uuid'

import { UploadImageData } from './type'

export async function uploadImage({ file }: { file: File }): Promise<UploadImageData> {
  const name = uuid()
  const ext = mime.extension(file.type)
  const filename = encodeURIComponent(name + '.' + ext)
  const res = await fetch(`/api/rest/upload/image?filename=${filename}`)
  const { url } = await res.json()

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Length': file.size.toString(),
    },
    body: file,
  })
    .then((res) => {
      console.log(res)
      return {
        url,
        filename,
      }
    })
    .catch((error) => {
      console.log(error)
      return error
    })
}
