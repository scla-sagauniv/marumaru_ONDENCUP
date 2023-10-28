import { NextRequest, NextResponse } from 'next/server'

import { UserOnAppType } from './services/schema/user'

export const config = {
  matcher: ['/todo/:path*', '/user/:path*'],
}

export async function middleware(request: NextRequest) {
  // hooks使えない
  // createTRPCProxyClientで作ったらcookieが送れない(cookieはあくまでブラウザで持っているから？)
  // だから、Nextの機能使ってcookie取得してfetchで無理やりcookie送るしかないのかな。。。
  const cookie = request.cookies.get('sid')
  const res = await fetch(
    `${process.env.BASE_URL}/api/trpc/auth.fetchUser?batch=1&input={}`,
    {
      headers: {
        Cookie: `sid=${cookie?.value}`,
      },
    },
  )
  const user: UserOnAppType | undefined = (await res.json())[0].result.data.json.user

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  } else if (request.nextUrl.pathname.startsWith('/confirm/email')) {
    return NextResponse.redirect(new URL(`/user/board/${user.id}`))
  }
}
