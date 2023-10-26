import { Inter } from 'next/font/google'

import AuthForm from '@/_components/AuthForm/AuthForm'
import Logos from '@/_components/Logos/Logos'

const inter = Inter({ subsets: ['latin'] })

export default function AuthPage() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-7 p-24 ${inter.className}`}
    >
      <Logos />
      <AuthForm />
    </main>
  )
}
