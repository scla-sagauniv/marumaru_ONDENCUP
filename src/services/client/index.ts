export const clientResponseHandler = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Status: ${res.status} : An error occurred while fetching the data.`)
  }
  return res.json()
}
