import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'

import { AccountForm } from '@/_components/AccountContainer/AccountForm'

import Layout from './layout'

const AccountPage: NextPageWithLayout = () => {
  const router = useRouter()
  return <AccountForm userId={router.query.user} />
}
AccountPage.getLayout = (page) => <Layout>{page}</Layout>

export default AccountPage
