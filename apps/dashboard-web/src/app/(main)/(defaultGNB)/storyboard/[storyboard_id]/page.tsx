'use client';

import FixedContainer from '@/components/common/FixedContainer/FixedContainer';
import { FixedContainerContextProvider } from '@/components/common/FixedContainer/FixedContainerContext';
import StoryBoardEditor from '@/components/StoryBoard/StoryBoardEditor';
import StoryBoardHeader from '@/components/StoryBoard/StoryBoardHeader';

const StoryboardDetailPage = ({
  params: { storyboard_id },
}: {
  params: { storyboard_id: string };
}) => {
  return (
    <FixedContainerContextProvider
      className="w-full translate-y-[-5.5rem]"
      portalId="storyboard-fixed-container"
    >
      <div className="bg-grey00 flex h-screen w-full flex-col items-stretch gap-[10px] text-black">
        <FixedContainer>
          <StoryBoardHeader button="export" />
        </FixedContainer>
        <StoryBoardEditor storyBoardId={storyboard_id} />
      </div>
    </FixedContainerContextProvider>
  );
};

export default StoryboardDetailPage;
