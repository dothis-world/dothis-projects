'use client';

import { Player } from '@lottiefiles/react-lottie-player';

import LoadingLottie from '@/assets/loading.json';
function LoginLoadingComponent() {
  if (typeof window === 'undefined') {
    throw Error('Chat should only render on the client.');
  }
  return (
    <>
      <Player
        loop
        src={LoadingLottie}
        autoplay
        style={{ width: '220px', height: '220px' }}
      />
    </>
  );
}

export default LoginLoadingComponent;
