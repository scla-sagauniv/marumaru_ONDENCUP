import { NextPageWithLayout } from 'next'

import { AccountForm } from '@/_components/AccountContainer/AccountForm'

import Layout from './layout'

const AccountPage: NextPageWithLayout = () => {
  return <AccountForm />
}
AccountPage.getLayout = (page) => <Layout>{page}</Layout>

export default AccountPage
