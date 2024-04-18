import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import Back from 'public/icons/back.svg';
import { forwardRef } from 'react';

import withForwardRef from '@/hocs/withForwardRef';

interface StoryBoardHeaderProps {
  forwardRef: React.Ref<any>;
  title?: string;
  button?: 'export' | 'close';
}

const StoryBoardHeader = ({
  forwardRef,
  title = '',
  button,

  ...props
}: StoryBoardHeaderProps) => {
  const router = useRouter();

  console.log(forwardRef);
  return (
    <div
      className="inline-flex w-full gap-[24px] p-[30px]"
      ref={forwardRef}
      /**
      * 만약 여기서도 콜백Ref를 사용해야하는 경우
      ref={(node) => {
        if (forwardRef) {
          // forwardRef에 콜백 ref를 설정합니다.
          if (typeof forwardRef === 'function') {
            forwardRef(node);
          }
        }
      }}
       */

      {...props}
    >
      <Back
        onClick={router.back}
        width={30}
        height={30}
        className="grow-0 cursor-pointer"
      />
      <p className=" grow items-start text-[26px] font-semibold leading-8">
        {title}
      </p>
      <div className="grow-0">
        {button &&
          (button === 'close' ? (
            <p onClick={() => window.history.go(2)}>닫기</p>
          ) : (
            <Button size="S" theme="outlined-grey">
              내보내기
            </Button>
          ))}
      </div>
    </div>
  );
};

export default withForwardRef(StoryBoardHeader);
