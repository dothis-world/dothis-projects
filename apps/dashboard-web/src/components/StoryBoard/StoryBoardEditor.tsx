import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_EDITOR_SCHEMA,
  type StoryBoardFieldValues,
} from '@/constants/schema/storyboard';
import useGetStoryBoard from '@/hooks/react-query/query/useGetStoryBoard';

import DetailForm from './Form/DetailForm';
import OverviewForm from './Form/OverviewForm';
import SearchParamNav from './Nav/SearchParamNav';

interface StoryBoardEditorProps {
  storyBoardId: string;
}

const StoryBoardEditor = ({ storyBoardId }: StoryBoardEditorProps) => {
  const searchParams = useSearchParams();

  const { data, isInitialLoading } = useGetStoryBoard(storyBoardId);
  const { setValue, register, watch, reset } = useForm({
    resolver: zodResolver(STORYBOARD_EDITOR_SCHEMA),
    defaultValues: {} as StoryBoardFieldValues,
  });

  useEffect(() => {
    if (data)
      reset({
        ...data.overview,
        title: data.title,
        author: 'chae', // data.author
        createdDate: new Date().toDateString(), // data.overview.createdDate
      });
  }, [isInitialLoading]);

  const update = (
    value: StoryBoardFieldValues[keyof StoryBoardFieldValues],
    fieldName: keyof StoryBoardFieldValues,
  ) => {
    console.log('update', fieldName, value);
  };

  return (
    <>
      <OverviewForm
        register={register}
        update={update}
        setValue={setValue}
        createdDate={watch('createdDate')}
        uploadDate={watch('uploadDate')}
      />
      <SearchParamNav navKeys={['영상 개요', '스토리보드']} searchKey="e" />
      {!searchParams?.get('e') ? (
        <>
          <DetailForm register={register} update={update} />
          <p className="text-pink">파일 추가</p>
        </>
      ) : (
        <p className="text-pink">씬 리스트</p>
      )}
    </>
  );
};

export default StoryBoardEditor;
