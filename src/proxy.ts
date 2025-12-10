// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(request.url);
  requestHeaders.set('x-current-path', request.nextUrl.pathname);
  requestHeaders.set('x-current-url', request.url);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
