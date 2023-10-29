import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from '@/services/server/lib/session'
import { prisma } from '@/services/server/prisma'

type Result = {
  success: boolean
  error: unknown
}

type PresignedPostUrl = {
  url: string
}

const createPresignedUrlWithClient = (key: string) => {
  const REGION = 'ap-northeast-1'
  const BUCKET = 'marumaru-onden-prod'
  const client = new S3Client(REGION)
  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key })
  return getSignedUrl(client, command, { expiresIn: 3600 })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PresignedPostUrl | Result>,
) {
  try {
    const session = await getSession(req, res)
    const email = session?.user?.email

    const key = req.query.filename as string
    const clientUrl = await createPresignedUrlWithClient(key)

    prisma.user.update({
      where: {
        email: email,
      },
      data: {
        avatarUrl: key,
      },
    })

    res.status(200).json({
      url: clientUrl,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    })
  }
}
