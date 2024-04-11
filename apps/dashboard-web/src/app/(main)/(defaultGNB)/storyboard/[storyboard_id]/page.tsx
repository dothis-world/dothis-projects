'use client';

import StickyContainer from '@/components/common/StickyContainer/StickyContainer';
import { StickyContainerContextProvider } from '@/components/common/StickyContainer/StickyContainerContext';
import StoryBoardEditor from '@/components/StoryBoard/StoryBoardEditor';
import StoryBoardHeader from '@/components/StoryBoard/StoryBoardHeader';

const StoryboardDetailPage = ({
  params: { storyboard_id },
}: {
  params: { storyboard_id: string };
}) => {
  return (
    <div className="bg-grey00 flex h-screen w-full flex-col items-stretch gap-[10px] text-black">
      <StickyContainerContextProvider
        className="bg-grey00 z-10"
        portalId="storyboard-sticky-container"
      >
        <StickyContainer>
          <StoryBoardHeader button="export" />
        </StickyContainer>
        <StoryBoardEditor storyBoardId={storyboard_id} />
      </StickyContainerContextProvider>
    </div>
  );
};

export default StoryboardDetailPage;
