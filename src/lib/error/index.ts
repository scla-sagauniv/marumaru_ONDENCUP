import { NextApiResponse } from 'next'

export const errorHandler = ({
  error,
  res,
}: {
  error: unknown
  res: NextApiResponse
}) => {
  if (error instanceof Error) {
    res.status(500).json(new Error(error.message))
  } else {
    res.status(500).json(new Error('error'))
  }
}
