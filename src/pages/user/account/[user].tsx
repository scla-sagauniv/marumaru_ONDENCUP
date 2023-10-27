import { AccountForm } from '@/_components/AccountContainer/AccountForm'
import { Toaster } from '@/_components/ui/toaster'

export default function AccountPage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <main className='flex flex-col items-center justify-center flex-1 px-15'>
          <AccountForm />
        </main>
        <Toaster />
      </div>
    </>
  )
}
