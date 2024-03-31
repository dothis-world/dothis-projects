import type { UseFormRegister } from 'react-hook-form';

import type { StoryBoardFieldValues } from '@/constants/schema/storyboard';
import { InputField } from '../Field/InputField';
import { TextAreaField } from '../Field/TextareaField';

interface DetailFormProps {
  register: UseFormRegister<StoryBoardFieldValues>;
  update: (
    value: StoryBoardFieldValues[keyof StoryBoardFieldValues],
    fieldName: keyof StoryBoardFieldValues,
  ) => void;
  show?: boolean;
}

const DetailForm = ({ register, update, show = true }: DetailFormProps) => {
  return (
    <form className="flex flex-col gap-[10px] px-[30px]">
      <InputField
        {...register('actors', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'actors'),
        })}
        label="출연진"
        placeholder="출연진을 적어주세요"
        maxLength={120}
      />
      <InputField
        {...register('location', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'location'),
        })}
        label="장소"
        placeholder="장소을 적어주세요"
        maxLength={5000}
      />
      <TextAreaField
        {...register('description', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'description'),
        })}
        label="설명"
        placeholder="설명을 적어주세요"
        maxLength={5000}
      />
    </form>
  );
};

export default DetailForm;
