import { useRouter } from 'next/router'

import { trpc } from '@/utils/trpc'

const ConfirmEmailPage = () => {
  // get the token from the url
  const { token } = useRouter().query

  const resetPasswordMutation = trpc.auth.confirmEmail.useMutation()
  const onSubmit = async () => {
    const res = await resetPasswordMutation.mutateAsync({
      token: token as string,
    })
    console.log(res)
  }
  return (
    <div>
      <h1 style={{ color: 'white' }}>Confirm Email</h1>
      <button style={{ color: 'white', marginLeft: '10px' }} onClick={onSubmit}>
        Confirm Email
      </button>
    </div>
  )
}

export default ConfirmEmailPage
