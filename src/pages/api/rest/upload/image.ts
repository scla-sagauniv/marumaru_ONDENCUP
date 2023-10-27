import S3, { PresignedPost } from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

// import { prisma } from '@/services/server/prisma'

type Result = {
  success: boolean
  error: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PresignedPost | Result>,
) {
  // const email = (await getSession(req, res)).user?.email

  const fileName = req.query.file
  const fileType = req.query.fileType

  const s3New = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    endpoint: process.env.AWS_S3_ENDPOINT,
  })

  try {
    const post = s3New.createPresignedPost({
      Bucket: 'images',
      Fields: {
        key: fileName,
        'Content-Type': fileType,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
    })
    console.log('**********')
    console.log(post)
    console.log('**********')

    // await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     avatarUrl: post.url,
    //   },
    // })
    res.status(200).json(post)
  } catch (err) {
    return res.status(500).json({ success: false, error: err })
  }
}
