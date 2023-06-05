'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import type { KeywordSchema } from '@/constants/schema/login';
import { LOGIN_KEYWORD_SCHEMA } from '@/constants/schema/login';

import Keywords from './Keywords';

function LoginKeyword({ keyword }: KeywordSchema) {
  const methods = useForm<KeywordSchema>({
    mode: 'onChange',
    resolver: zodResolver(LOGIN_KEYWORD_SCHEMA),
    defaultValues: {
      keyword: [],
    },
  });

  const onSubmit = async () => {
    console.log('data submit');
  };

  return (
    <FormProvider {...methods}>
      <Keywords keyword={keyword} />
    </FormProvider>
  );
}

export default LoginKeyword;
