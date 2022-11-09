import { Box, Divider, VStack } from '@chakra-ui/react';
import Button from '@dothis/share/components/ui/Button';
import SvgFacebook from '@dothis/share/components/ui/Icons/SvgFacebook';
import SvgInstagram from '@dothis/share/components/ui/Icons/SvgInstagram';
import SvgTwitch from '@dothis/share/components/ui/Icons/SvgTwitch';
import SvgYoutube from '@dothis/share/components/ui/Icons/SvgYoutube';
import { useModalStore } from '@dothis/share/lib/models';
import { css } from '@emotion/react';
import { signIn } from 'next-auth/react';
import React from 'react';

import { PAGE_KEYS } from '@/constants';

export default function Login() {
  return (
    <VStack css={style} spacing={20}>
      <Button theme="white" onClick={() => signIn('google')} round>
        <SvgYoutube />
        <strong>구글 로그인</strong>
      </Button>
      <Divider></Divider>
      <Button theme="white" disabled onClick={() => signIn('instagram')} round>
        <SvgInstagram />
        <strong>인스타그램 로그인</strong>
      </Button>
      <Button theme="white" disabled onClick={() => signIn('facebook')} round>
        <SvgFacebook />
        <strong>페이스북 로그인</strong>
      </Button>
      <Divider></Divider>
      <Button theme="white" disabled onClick={() => signIn('twitch')} round>
        <SvgTwitch />
        <strong>트위치 로그인</strong>
      </Button>
    </VStack>
  );
}
const style = css`
  padding: 18px 36px;

  button {
    height: 50px;
    width: 100%;
    max-width: 380px;
  }

  strong {
    display: block;
    min-width: 120px;
    margin-left: 18px;
  }
`;

Login.openModal = () => {
  useModalStore.getState().open(PAGE_KEYS.login, {
    Component: () => (
      <Box w={456}>
        <Login />
      </Box>
    ),
    title: '로그인',
  });
};
