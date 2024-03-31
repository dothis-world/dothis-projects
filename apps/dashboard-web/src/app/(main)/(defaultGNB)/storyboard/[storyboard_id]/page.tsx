'use client';

import StoryBoardEditor from '@/components/StoryBoard/StoryBoardEditor';
import StoryBoardHeader from '@/components/StoryBoard/StoryBoardHeader';

const StoryboardDetailPage = ({
  params: { storyboard_id },
}: {
  params: { storyboard_id: string };
}) => {
  return (
    <div className="flex w-full flex-col items-stretch gap-[10px] text-black">
      <StoryBoardHeader button="export" />
      <StoryBoardEditor storyBoardId={storyboard_id} />
    </div>
  );
};

export default StoryboardDetailPage;
