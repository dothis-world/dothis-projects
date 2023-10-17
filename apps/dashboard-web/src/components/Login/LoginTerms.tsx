'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LOGIN_TERMS_SCHEMA } from '@/constants/schema/loginTerms';
import { apiClient } from '@/utils/apiClient';

import CheckboxContainer from '../common/Checkbox';
import { CheckBox } from '../common/Checkbox/style';
import Modal from '../common/Modal/AuthModal/Modal';
import TermsModal from '../common/Modal/TermsModal/TermsModal';
import TermsModalContents from '../common/Modal/TermsModal/TermsModalContents';

const LoginTerms = () => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(LOGIN_TERMS_SCHEMA),
    defaultValues: {
      service: false,
      privacy: false,
      marketing: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    // 약관동의 코드 작성
  };

  const [onError, setOnError] = useState(false);

  useEffect(() => {
    (errors.privacy || errors.service) && setOnError(true);
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 flex flex-col items-center gap-[10px]">
          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('service')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}필수{')'}
            </span>
            <TermsBox>서비스 이용 약관 동의 </TermsBox>
          </div>

          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('privacy')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}필수{')'}
            </span>
            <TermsBox>개인정보 처리방침 동의</TermsBox>
          </div>
          <div className="flex items-center gap-[6px]">
            <CheckBox $size="md" type="checkbox" {...register('marketing')} />
            <span className="text-grey900 text-[12px] font-bold">
              {'('}선택{')'}
            </span>
            <TermsBox>마케팅 정보 제공 동의</TermsBox>
          </div>
        </div>
        <div className="flex justify-center">
          <Button size="L" theme="contained" type="submit">
            가입하기
          </Button>
        </div>
      </form>
      {onError && (
        <TermsModal setOnError={setOnError}>
          <TermsModalContents
            errorMessage={errors.service?.message || errors.privacy?.message}
            setOnError={setOnError}
          />
        </TermsModal>
      )}
    </>
  );
};

export default LoginTerms;

const TermsBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-grey00 bg-grey700 w-[160px] rounded-[50px] py-1 text-center text-[12px]">
      {children}
    </div>
  );
};
