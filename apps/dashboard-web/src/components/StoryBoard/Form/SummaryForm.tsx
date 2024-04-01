import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import type { StoryBoardFieldValues } from '@/constants/schema/storyboard';

import CalendarField from '../Field/CalendarField';
import { InputField } from '../Field/InputField';

interface SummaryFormProps {
  register: UseFormRegister<StoryBoardFieldValues>;
  update: (
    value: StoryBoardFieldValues[keyof StoryBoardFieldValues],
    fieldName: keyof StoryBoardFieldValues,
  ) => void;
  setValue: UseFormSetValue<StoryBoardFieldValues>;
  createdDate: string;
  uploadDate: string;
}

const SummaryForm = ({
  register,
  update,
  setValue,
  createdDate,
  uploadDate,
}: SummaryFormProps) => {
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
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  update(e.target.value, 'createdDate'),
              }),
              placeholder: '00.00.00',
              readOnly: true,
              maxLength: 8,
            }}
            defaultDate={createdDate}
            handleSelectDate={(value) => {
              setValue('createdDate', value);
              if (uploadDate < value) setValue('uploadDate', value);
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
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  update(e.target.value, 'uploadDate'),
              }),
              placeholder: '00.00.00',
              readOnly: true,
              maxLength: 8,
            }}
            handleSelectDate={(value: string) => {
              setValue('uploadDate', value);
            }}
            defaultDate={uploadDate ?? createdDate}
            validAfterDate={createdDate}
          />
        </div>
      </div>
    </form>
  );
};

export default SummaryForm;
