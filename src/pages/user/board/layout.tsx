import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'

import { NavBar } from '@/_components/NavBar'
import { addUser, selectFirstFetched, updateIsFirstFetched } from '@/lib/state/slices'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const isFirstFetched = useSelector(selectFirstFetched)
  const { data } = trpc.auth.fetchUser.useQuery()
  if (isFirstFetched == false) {
    data?.user && dispatch(addUser({ user: data.user }))
    dispatch(updateIsFirstFetched(true))
  }
  return (
    <div className='h-screen flex flex-col'>
      <NavBar />
      <main className={`flex min-w-screen h-full py-4 px-24 ${inter.className}`}>
        {children}
      </main>
    </div>
  )
}
