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
        style={{ width: '500px', height: '500px' }}
      />
    </>
  );
}

export default LoginLoadingComponent;
