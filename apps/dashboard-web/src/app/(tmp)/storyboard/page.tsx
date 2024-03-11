'use client';
import { useCreateStoryBoardMutation } from '@/hooks/react-query/mutation/useStoryboardMutation';
import useGetStoryBoardPagination from '@/hooks/react-query/query/useGetStoryBoardPagination';
import { useState } from 'react';

const Landing_test = () => {
  const [storyboardId, setStoryboardId] = useState<string>();
  const csb = useCreateStoryBoardMutation();
  const { data } = useGetStoryBoardPagination({ page: 1 });
  console.log('useGetStoryBoardPagination data: ', data);

  return (
    <>
      <input
        type="text"
        value={storyboardId}
        onChange={(e) => {
          setStoryboardId(e.target.value);
        }}
      />
      <div
        onClick={() => {
          csb.mutate({
            onSuccess: () => {},
          });
        }}
      >
        이거클릭하
      </div>
    </>
  );
};

export default Landing_test;
