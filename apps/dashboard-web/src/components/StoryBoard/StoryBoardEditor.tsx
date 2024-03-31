import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_EDITOR_SCHEMA,
  type StoryBoardFieldValues,
} from '@/constants/schema/storyboard';

import DetailForm from './Form/DetailForm';
import OverviewForm from './Form/OverviewForm';
import SearchParamNav from './Nav/SearchParamNav';

const StoryBoardEditor = () => {
  const searchParams = useSearchParams();

  const { setValue, register, watch } = useForm({
    resolver: zodResolver(STORYBOARD_EDITOR_SCHEMA),
    defaultValues: {} as StoryBoardFieldValues,
  });

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
