import { NextRequest, NextResponse } from 'next/server'

import { UserOnAppType } from './services/schema/user'

export const config = {
  matcher: ['/api-demo/:path*', '/todo/:path*'],
}

export async function middleware(request: NextRequest) {
  // hooks使えない
  // createTRPCProxyClientで作ったらcookieが送れない(cookieはあくまでブラウザで持っているから？)
  // だから、Nextの機能使ってcookie取得してfetchで無理やりcookie送るしかないのかな。。。
  const cookie = request.cookies.get('sid')
  const res = await fetch(
    'http://localhost:8080/api/trpc/auth.fetchUser?batch=1&input={}',
    {
      headers: {
        Cookie: `sid=${cookie?.value}`,
      },
    },
  )
  const user: UserOnAppType | undefined = (await res.json())[0].result.data.user

  if (user === undefined) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  } else if (request.url.includes('/confirm/email')) {
    return NextResponse.redirect(new URL(`/user/board/${user.id}`))
  }
}
