import 'swiper/css';

import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import axios from 'axios';
import { enableMapSet } from 'immer';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import superjson from 'superjson';

import { useUrlHistoryEvent } from '@/hooks/useUrlHistoryEvent';
import { trpc } from '@/utils/trpc';
import { dothisTheme, globalStyle, Modal, standaloneToast } from '@dothis/share';
import { ModalOptProvider, useModalStore } from '@/models/Modal';


// immer Map Set 사용 가능하게
enableMapSet();

// superjson으로 변환
axios.defaults.transformResponse = (data, headers) => {
  try {
    return typeof data === 'string' ? superjson.parse(data) : data;
  } catch (e) {
    return data;
  }
};
export const toast = standaloneToast.toast;

// @ts-ignore
BigInt.prototype.toJSON = function() {
  return this.toString();
};

function App({
               Component,
               pageProps: { session, ...pageProps },
             }: AppProps<{ session: Session | null | undefined }>) {
  useUrlHistoryEvent();
  /* START - next.js와 react 18버전 충돌에 따른 예외 처리 */
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  /* END - next.js와 react 18버전 충돌에 따른 예외 처리 */

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Global styles={globalStyle} />
      <SessionProvider session={session}>
        <ChakraProvider theme={dothisTheme} resetCSS>
          {/*<CssBaseline enableColorScheme />*/}
          <Component {...pageProps} />
          <standaloneToast.ToastContainer />
          <ModalOptProvider>
            <ModalManager />
          </ModalOptProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

const ModalManager = () => {
  const modalStore = useModalStore();

  return (
    <>
      {[...modalStore.modals.entries()].map(
        ([name, { title, modalOpt, Component }], i) => {
          function handleClose() {
            modalStore.close(name);
          }
          const zIndex = 1000 + i

          return (
            <Modal
              key={name}
              isOpen
              onClose={handleClose}
              title={title}
              zIndex={zIndex}
              {...modalOpt}
            >
              <Component />
            </Modal>
          );
        },
      )}
    </>
  );
};

export default trpc.withTRPC(App);
