import { Inter } from 'next/font/google'

import { NavBar } from '@/_components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col'>
      <NavBar />
      <main className={`flex min-w-screen h-full py-4 px-24 ${inter.className}`}>
        {children}
      </main>
    </div>
  )
}
