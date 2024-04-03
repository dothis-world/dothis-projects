import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type {
  StoryBoardOverviewFieldValues,
  StoryBoardSummaryFieldValues,
} from '@/constants/schema/storyboard';
import useGetStoryBoard from '@/hooks/react-query/query/useGetStoryBoard';

import OverviewForm from './Form/OverviewForm';
import SummaryForm from './Form/SummaryForm';
import SearchParamNav from './Nav/SearchParamNav';
import SceneControls from './Scene/SceneControls';
import SceneList from './Scene/SceneList';

interface StoryBoardEditorProps {
  storyBoardId: string;
}

const StoryBoardEditor = ({ storyBoardId }: StoryBoardEditorProps) => {
  const searchParams = useSearchParams();

  const { data, isInitialLoading } = useGetStoryBoard(storyBoardId);

  const [summaryValues, setSummaryValues] =
    useState<StoryBoardSummaryFieldValues>({} as StoryBoardSummaryFieldValues);
  const [overviewValues, setOverviewValues] =
    useState<StoryBoardOverviewFieldValues>(
      {} as StoryBoardOverviewFieldValues,
    );

  useEffect(() => {
    if (data) {
      setSummaryValues({
        title: data.title,
        author: 'chae', // data.author
        createdDate: new Date().toDateString(), // data.overview.createdDate
        uploadDate: new Date().toDateString(), // data.overview.uploadDate
      });
      setOverviewValues({
        actors: data.overview.actors,
        location: data.overview.location,
        description: data.overview.description,
      });
    }
  }, [isInitialLoading]);

  return (
    <>
      <SummaryForm storyBoardId={storyBoardId} defaultValues={summaryValues} />
      <SearchParamNav navKeys={['영상 개요', '스토리보드']} searchKey="e" />
      {!searchParams?.get('e') ? (
        <>
          <OverviewForm
            storyBoardId={storyBoardId}
            defaultValues={overviewValues}
          />
          <p className="text-pink">파일 추가</p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-[50px]">
          <SceneControls />
          <SceneList />
        </div>
      )}
    </>
  );
};

export default StoryBoardEditor;
