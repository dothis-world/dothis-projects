import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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
    // console.log('update - SummaryForm', fieldName, value);
  };

  useEffect(() => {
    reset(defaultValues);
    setValue('createdDate', '24.05.20');
    setValue('uploadDate', '24.05.20');
  }, [defaultValues]);

  const formatDate = (dateStr: string | undefined): Date | undefined => {
    if (!dateStr) return undefined;
    const date = dateStr.length < 10 ? '20' + dateStr : dateStr;
    return new Date(date);
  };
  const createdDate = formatDate(watch('createdDate'));
  const uploadDate = formatDate(watch('uploadDate') ?? watch('createdDate'));

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
            inputProps={{
              ...register('createdDate', {
                required: true,
              }),
              placeholder: 'YY.MM.DD',
              readOnly: true,
              maxLength: 8,
            }}
            defaultDate={createdDate}
            handleSelectDate={(dateStr) => {
              console.log('!@#$#@!@#@#', dateStr);
              setValue('createdDate', dateStr);
              update(dateStr, 'createdDate');
            }}
          />
        </div>
        <p>&gt;</p>
        <div className="flex grow flex-col">
          <CalendarField
            label="업로드예정일"
            inputProps={{
              ...register('uploadDate', {
                required: true,
              }),
              placeholder: 'YY.MM.DD',
              readOnly: true,
              maxLength: 8,
            }}
            handleSelectDate={(dateStr: string) => {
              setValue('uploadDate', dateStr);
              update(dateStr, 'uploadDate');
            }}
            defaultDate={uploadDate}
            validAfterDate={createdDate}
          />
        </div>
      </div>
    </form>
  );
};

export default SummaryForm;
