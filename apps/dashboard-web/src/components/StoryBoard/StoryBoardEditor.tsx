import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_EDITOR_SCHEMA,
  type StoryBoardFieldValues,
} from '@/constants/schema/storyboard';

import DetailForm from './Form/DetailForm';
import OverviewForm from './Form/OverviewForm';

const StoryBoardEditor = () => {
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
      <DetailForm register={register} update={update} />
    </>
  );
};

export default StoryBoardEditor;
