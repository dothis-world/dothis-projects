import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_EDITOR_SCHEMA,
  type StoryBoardFieldValues,
} from '@/constants/schema/storyboard';
import { useUpdateStoryBoardTitleMutation } from '@/hooks/react-query/mutation/useStoryboardMutation';
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
  const getData = (fieldName: keyof StoryBoardFieldValues) => {
    if (data === undefined) return undefined;
    switch (fieldName) {
      case 'title':
        return data.title;
      case 'author':
        return 'chae'; // data.title;
      case 'createdDate':
        return new Date().toDateString(); // data.overview.createdDate;
      case 'uploadDate':
        return data.overview.uploadDate;
      case 'actors':
        return data.overview.actors;
      case 'location':
        return data.overview.location;
      case 'description':
        return data.overview.description;
    }
  };

  const mutates: Record<keyof StoryBoardFieldValues, (value: string) => void> =
    {
      title: useUpdateStoryBoardTitleMutation({
        storyBoardId,
      }).mutate,
      author: (value: string) => {},
      createdDate: (value: string) => {},
      uploadDate: (value: string) => {},
      actors: (value: string) => {},
      location: (value: string) => {},
      description: (value: string) => {},
    };

  const { setValue, register, reset, watch } = useForm({
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
    if (getData(fieldName) === value) return;
    mutates[fieldName](value);
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
