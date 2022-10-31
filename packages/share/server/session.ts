import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { pagePath } from '@/lib/constants';
import type { Message } from '@/lib/models/Message';
import { errorMessage } from '@/lib/models/Message';
import type { PartialRequiredNotNull } from '@/lib/types/utilityTypes';
 
export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXTAUTH_SECRET as string,
  cookieName: 'sid',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const withSessionRoute = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, sessionOptions);

export const withSessionSsr = <P extends Record<string, unknown> = Record<string, unknown>,
  >(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) => withIronSessionSsr(handler, sessionOptions);

export const withUserSessionSsr = <P extends Record<string, unknown> = Record<string, unknown>,
  >(
  handler: (
    context: GetServerSidePropsContext,
    userSession: PartialRequiredNotNull<Session['user'], 'id' | 'name'>,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) =>
  withIronSessionSsr(async (context) => {
    const session = await getSession(context);
    if (!session?.user.id || !session?.user.name) {
      context.req.session.message = errorMessage({
        message: '로그인이 필요한 서비스입니다.',
      });
      await context.req.session.save();
      return {
        redirect: {
          destination: pagePath.login().pathname,
          permanent: false,
        },
      };
    }
    return handler(
      context,
      session.user as PartialRequiredNotNull<Session['user'], 'id' | 'name'>,
    );
  }, sessionOptions);
