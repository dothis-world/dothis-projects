'use client';

import PopperProvider from './PopperProvider';
import ToggleProvider from './ToggleProvider';

const CounterTest = () => {
  // Dialog Context생성
  const FeedbackDialog = ToggleProvider;
  // Dialog Context생성
  const AnotherDialog = ToggleProvider;
  return (
    <div className="flex flex-col">
      <ToggleProvider>
        <AnotherDialog>
          <ToggleProvider.Trigger>
            <button>여기 클릭해주세요</button>
          </ToggleProvider.Trigger>
          <AnotherDialog.Trigger>
            <div>안녕</div>
          </AnotherDialog.Trigger>
          <AnotherDialog.Content>
            이거는 테스트 프로바이더
          </AnotherDialog.Content>
          <ToggleProvider.Portal>
            <ToggleProvider.Content>
              <p>안녕</p>
            </ToggleProvider.Content>
          </ToggleProvider.Portal>
        </AnotherDialog>
      </ToggleProvider>
    </div>
  );
};

export default CounterTest;
