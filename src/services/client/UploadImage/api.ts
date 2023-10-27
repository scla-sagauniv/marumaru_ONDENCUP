// import mime from 'mime-types'
import { v4 as uuid } from 'uuid'

import { UploadImageData } from './type'

export async function uploadImage({ file }: { file: File }): Promise<UploadImageData> {
  const name = uuid()
  //   const ext = mime.extension(file.type)
  const filename = encodeURIComponent(`${name}`)
  const fileType = encodeURIComponent(file.type)
  const res = await fetch(`/api/rest/upload/image?file=${filename}&fileType=${fileType}`)
  const { url, fields } = await res.json()
  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string)
  })
  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then(() => {
    return {
      url,
      filename,
      fields,
    }
  })
}
