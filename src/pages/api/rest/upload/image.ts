import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { PresignedPost } from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

// import { prisma } from '@/services/server/prisma'

type Result = {
  success: boolean
  error: unknown
}

type PresignedPostUrl = {
  url: string
  fields: PresignedPost.Params['Fields']
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PresignedPostUrl | Result>,
) {
  // const email = (await getSession(req, res)).user?.email

  const fileName = req.query.file as string
  const fileType = req.query.fileType as string

  // const s3New = new S3({
  //   accessKeyId: process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: process.env.AWS_SECRET,
  //   endpoint: process.env.AWS_S3_ENDPOINT,
  // })
  const client = new S3Client({ region: 'ap-northeast-1' })

  const Conditions = [
    { acl: 'public-read' },
    { bucket: 'marumaru-ondencup' },
    ['starts-with', '$key', `marumaru/${fileName}`],
    ['content-length-range', 0, 1048576], // up to 1 MB
  ]

  const Bucket = 'marumaru-ondencup'
  const Key = `marumaru/${fileName}`
  const Fields = {
    acl: 'public-read',
  }

  try {
    const { url, fields } = await createPresignedPost(client, {
      Bucket,
      Key,
      // @ts-ignore
      Conditions,
      Fields,
      Expires: 60,
    })
    console.log('**********')
    console.log(url, fields)
    console.log('**********')

    // await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     avatarUrl: post.url,
    //   },
    // })
    res.status(200).json({ url, fields })
  } catch (err) {
    return res.status(500).json({ success: false, error: err })
  }
}
