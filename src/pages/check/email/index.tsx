import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function CheckEmailPage() {
  return (
    <main
      className={`flex justify-center items-center min-w-screen h-screen w-full py-4 px-24 ${inter.className}`}
    >
      <div className='text-center'>
        <h1 className='text-slate-100 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          We sent you an email! 📤
        </h1>
        <p className='text-slate-400 text-sm mt-5'>
          Please check out the email to continue in this app!
        </p>
      </div>
    </main>
  )
}
