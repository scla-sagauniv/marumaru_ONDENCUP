import { NextRequest, NextResponse } from 'next/server'

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
  const json = await res.json()

  if (json[0].result.data.json.user === undefined) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }
}
