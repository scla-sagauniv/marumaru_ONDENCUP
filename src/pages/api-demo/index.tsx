import { Inter } from 'next/font/google'
import { useState } from 'react'

import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

const Healthcheck = ({ input }: { input: { name: string | undefined } }) => {
  const res = trpc.healthcheck.useQuery(input)
  if (!res.data) {
    return <p style={{ color: 'white' }}>Loading...</p>
  }
  if (res.error) {
    return <p style={{ color: 'white' }}>{res.error.message}</p>
  }
  console.log(res.data)
  return <p style={{ color: 'white' }}>response: {res.data.greeting}</p>
}

export default function ApiDemoPage() {
  const [healthValue, setHealthValue] = useState<{ name: string | undefined }>({
    name: undefined,
  })
  const [name, setName] = useState<string>('')

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-7 p-24 ${inter.className}`}
    >
      <h1 style={{ color: 'white' }}>Api Demo</h1>
      <div>
        <p style={{ color: 'white' }}>healthcheck</p>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <button
          style={{ color: 'white', marginLeft: '10px' }}
          onClick={() => setHealthValue({ name: name })}
        >
          Submit
        </button>
        <Healthcheck input={healthValue} />
      </div>
    </main>
  )
}
