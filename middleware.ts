import { type NextRequest, NextResponse } from 'next/server';
import { precompute } from 'flags/next';
import { marketingFlags } from './flags';

export const config = {
  matcher: ['/'],
};

export async function middleware(request: NextRequest) {
  const code = await precompute(marketingFlags);
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );
  return NextResponse.rewrite(nextUrl, { request });
}
