import axios from 'axios';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { apiServer } from './utils/api/apiServer';

// 추 후  라우팅가드를 위한 middleware 파일 생성 (기획단과 상의 후 라우팅 가드 적용 예정)
export async function middleware(request: NextRequest) {
  // if (
  //   !request.nextUrl.pathname.endsWith('summary') &&
  //   !request.nextUrl.pathname.endsWith('analysis') &&
  //   !request.nextUrl.pathname.endsWith('comparison') &&
  //   !request.nextUrl.pathname.endsWith('insight')
  // ) {
  //   return NextResponse.redirect(
  //     new URL(request.nextUrl.pathname + '/summary', request.url),
  //   );
  // }
  // if (request.nextUrl.pathname.startsWith('/contents')) {
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set(
  //     'Authorization',
  //     request.cookies.get('accessToken')?.value as string,
  //   );
  //   const data = await fetch('https://api.dothis.kr/v2/user/keyword', {
  //     // headers: requestHeaders,
  //   });
  //   const responseData = await data.json();
  //   if (responseData.statusCode === 401) {
  //     const auth = await fetch('https://api.dothis.kr/v1/auth/verify-token', {
  //       credentials: 'include',
  //     });
  //     console.log(auth);
  //     const authResponse = await auth.json();
  //     console.log(authResponse);
  //   }
  //   const response = NextResponse.redirect(
  //     new URL('/about?search=dashboard', request.nextUrl),
  //   );
  //   response.cookies.set('test', 'test');
  //   return response;
  // }
  // 랜덤으로 게스트 키워드 생성해주는 코드 (아래)
  // if (
  //   request.nextUrl.pathname.startsWith('/contents') &&
  //   !request.nextUrl.searchParams.has('guestKeyword')
  // ) {
  //   const test = ['check', 'phone', 'rice', 'paper', 'news', 'date'];
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set(
  //     'Authorization',
  //     request.cookies.get('accessToken')?.value as string,
  //   );
  //   const data = await fetch('https://api.dothis.kr/v1/auth/own-info', {
  //     headers: {
  //       Authorization: request.cookies.get('accessToken')?.value as string,
  //     },
  //   });
  //   const responseData = await data.json();
  //   // console.log(responseData.data.personalizationTag);
  //   return NextResponse.redirect(
  //     new URL(
  //       `/contents?guestKeyword=${test[Math.floor(Math.random() * 6)]}`,
  //       request.nextUrl,
  //     ),
  //   );
  // }

  // if (
  //   request.headers.get('referer') === null &&
  //   request.headers.get('sec-fetch-site') === 'none'
  // ) {
  //   return NextResponse.redirect(new URL(`/about`, request.nextUrl));
  // }

  // 계정 정보 페이지 Route Protection
  if (request.nextUrl.pathname.startsWith('/account')) {
    const [, , tab] = request.nextUrl.pathname.split('/');

    const accountPageRoutes = ['my-account', 'plans', 'help'];

    if (!accountPageRoutes.some((route) => tab === route)) {
      return NextResponse.redirect(
        new URL('/account' + '/my-account', request.nextUrl),
      );
    }
  }

  // 연관어 페이지 Route Protection
  if (request.nextUrl.pathname.startsWith('/keyword')) {
    const [, , baseKeyword, relatedWord, tab] =
      request.nextUrl.pathname.split('/');

    const relatedPageRoutes = ['analysis', 'comparison', 'insight', 'summary'];

    if (relatedWord && !relatedPageRoutes.some((route) => tab === route)) {
      return NextResponse.redirect(
        new URL(
          '/keyword' + `/${baseKeyword}` + `/${relatedWord}` + '/analysis',
          request.nextUrl,
        ),
      );
    }
  }

  if (request.nextUrl.pathname.startsWith('/channel')) {
    const [, , tab] = request.nextUrl.pathname.split('/');

    const channelPageRoutes = [
      'summary',
      'channel-analysis',
      'competitive-analysis',
      'video-assessment',
    ];

    if (!channelPageRoutes.some((route) => tab === route)) {
      return NextResponse.redirect(
        new URL('/channel' + '/competitive-analysis', request.nextUrl),
      );
    }
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ['/keyword/:path*', '/account/:path*', '/channel/:path*'],
  // matcher: '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  // matcher: ['/contents', '/mypage'],
};
