import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_SUMMARY_SCHEMA,
  type StoryBoardSummaryFieldValues,
} from '@/constants/schema/storyboard';
import { useUpdateStoryBoardTitleMutation } from '@/hooks/react-query/mutation/useStoryboardMutation';

import CalendarField from '../Field/CalendarField';
import { InputField } from '../Field/InputField';

interface SummaryFormProps {
  storyBoardId: string;
  defaultValues: StoryBoardSummaryFieldValues;
}

const SummaryForm = ({ storyBoardId, defaultValues }: SummaryFormProps) => {
  const { setValue, register, reset, watch } = useForm({
    resolver: zodResolver(STORYBOARD_SUMMARY_SCHEMA),
    defaultValues: {} as StoryBoardSummaryFieldValues,
  });

  const createdDate = watch('createdDate');
  const uploadDate = watch('uploadDate') ?? watch('createdDate');

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (dayjs(createdDate).isAfter(dayjs(uploadDate))) {
      setValue('uploadDate', createdDate);
    }
  }, [createdDate]);

  const mutates: Record<
    keyof StoryBoardSummaryFieldValues,
    (value: string) => void
  > = {
    title: useUpdateStoryBoardTitleMutation({
      storyBoardId,
    }).mutate,
    author: (value: string) => {},
    createdDate: (value: string) => {},
    uploadDate: (value: string) => {},
  };

  const update = (
    value: StoryBoardSummaryFieldValues[keyof StoryBoardSummaryFieldValues],
    fieldName: keyof StoryBoardSummaryFieldValues,
  ) => {
    if (defaultValues[fieldName] === value) return;
    mutates[fieldName](value);
  };

  const formatDate = (dateStr: string | undefined): Date | undefined => {
    if (!dateStr) return undefined;
    const date = dateStr.length < 10 ? '20' + dateStr : dateStr;
    return new Date(date);
  };

  return (
    <form className="flex flex-col gap-[30px] px-[30px]">
      <InputField
        {...register('title', {
          required: true,
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'title'),
        })}
        textSize={32}
        bold
        placeholder="제목"
        maxLength={120}
      />
      <InputField
        {...register('author', {
          required: true,
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'author'),
        })}
        label="작성자"
        placeholder="작성자를 적어주세요"
        maxLength={120}
      />
      <div className="item-center flex flex-row px-[200px] text-center">
        <div className="flex grow flex-col">
          <CalendarField
            label="작성일자"
            value={createdDate}
            readOnly
            maxLength={8}
            placeholder="2024.05.02"
            handleSelectDate={(dateStr) => {
              setValue('createdDate', dateStr);
              update(dateStr, 'createdDate');
            }}
            {...register('createdDate', {
              required: true,
            })}
          />
        </div>
        <p>&gt;</p>
        <div className="flex grow flex-col">
          <CalendarField
            label="업로드예정일"
            handleSelectDate={(dateStr: string) => {
              setValue('uploadDate', dateStr);
              update(dateStr, 'uploadDate');
            }}
            readOnly
            maxLength={8}
            value={uploadDate}
            validAfterDate={createdDate}
            placeholder="2024.05.02"
            {...register('uploadDate', {
              required: true,
            })}
          />
        </div>
      </div>
    </form>
  );
};

export default SummaryForm;
