import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'

import { AccountForm } from '@/_components/AccountContainer/AccountForm'
import { trpc } from '@/utils/trpc'

import Layout from './layout'

const AccountPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { data } = trpc.auth.fetchUser.useQuery()
  if (!data) {
    return
  }
  if (!data.user) {
    return <div>Loading...</div>
  }
  return (
    <AccountForm
      userId={router.query.user}
      name={data.user.name}
      avatarUrl={data.user.avatarUrl}
    />
  )
}
AccountPage.getLayout = (page) => <Layout>{page}</Layout>

export default AccountPage
