'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import SvgComp from '@/components/common/SvgComp';
import useAutoCompleteWordScoreMutation from '@/hooks/react-query/mutation/useAutoCompleteWordScoreMutation';
import { useResetKeywordMutation } from '@/hooks/react-query/mutation/useKeywordMutation';
import {
  useCreateSearchwordMutation,
  useResetSearchwordMutation,
} from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useGetChennelAutoComplete from '@/hooks/react-query/query/useGetChennelAutoComplete';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useDebounce from '@/hooks/useDebounce';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { useModalActions } from '@/store/modalStore';
import { cn } from '@/utils/cn';

const ChannelSearchbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [openInput, setOpenInput] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

  const isSignedIn = useIsSignedIn();

  const { setIsModalOpen, setModalContent } = useModalActions();

  const { data: userData } = useGetUserInfo();

  const { data } = useGetChennelAutoComplete(searchInput);

  // const { mutate: autoCompleteWordMutate } = useAutoCompleteWordScoreMutation();

  const handleInput = useDebounce((input) => setSearchInput(input), 200, [
    searchInput,
  ]);

  const { mutate: createSearchwordMutate } = useCreateSearchwordMutation();

  const { mutate: resetKeywordMutate } = useResetKeywordMutation();

  const { mutate: resetSearchwordMutate } = useResetSearchwordMutation();

  const handleResetKeyword = () => {
    resetSearchwordMutate();
    resetKeywordMutate();
  };

  const checkHashKeyword = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        return false;
      }

      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          return dataArray[i].endsWith('#');
        }
      }
      // 키워드를 찾지 못한 경우
      return false;
    },
    [],
  );

  // const updateAutoCompleteWordMutate = (word: string) => {
  //   autoCompleteWordMutate(word);
  // };

  //로그인 유도 시퀀스

  const { setIsOpenSignUpModal } = useAuthActions();

  const checkIsSignedIn = () => {
    if (isSignedIn) return true;
    setOpenInput(false);
    setIsOpenSignUpModal(true);
    // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.

    setModalContent(<SignUpModal />);
    setIsModalOpen(true);
    return false;
  };

  const handleRouteChangeKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    currentInput: string,
  ) => {
    // if (!checkIsSignedIn()) {
    //   return;
    // }

    if (event.key === 'Enter') {
      // if (
      //   data &&
      //   data?.filter((item) => item.endsWith('*'))[0]?.replace('*', '') ===
      //     currentInput
      // ) {
      //   // 엔터 키가 눌렸을 때 실행할 동작
      //   // router.push(`/keyword/${currentInput}`);
      // }
      /**
       * auto Complete 자동완성 키워드
       */
      // updateAutoCompleteWordMutate(currentInput);
      //   callback({ selectedWord: currentInput });
    }
  };

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const pathName = usePathname();

  useEffect(() => {
    setSearchInput('');
    setInput('');
  }, [pathName]);

  return (
    <div className="relative">
      <div className="border-grey400 flex w-[368px] items-center gap-[10px] rounded-[50px] border px-[30px] py-[14px]">
        <SvgComp icon="SearchIcon" size={16} />

        <input
          className="text-grey600  placeholder:text-grey400  w-full text-[16px]  outline-none"
          placeholder="채널 검색"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.currentTarget.value);
            startTransition(() => handleInput(e.currentTarget.value));
          }}
          // ref={searchInputRef}
          onKeyDown={(e) => {
            handleRouteChangeKeyDown(e, e.currentTarget.value);
          }}
        />
      </div>
      {isFocused && !!data?.length && (
        <div className=" border-grey400 bg-grey00 absolute z-50 mt-[10px] inline-flex w-full flex-col gap-[12px] rounded-[20px]   border py-5 ">
          {data
            .slice(0, 10)
            .map(({ channelName, subscriberCount, thumbnail }, index) => {
              const compactNumber = new Intl.NumberFormat('ko', {
                notation: 'compact',
              });
              return (
                <div
                  className="flex cursor-pointer items-center gap-[20px] px-[30px]"
                  key={channelName + index}
                >
                  <Image
                    src={thumbnail}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={`${channelName}__thumbnail`}
                  />
                  {/* <SvgComp
                  icon="BorderSearchIcon"
                  size={24}
                  className="mr-[16px]"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();

                  //   router.push(`/keyword/${item.replace('*', '')}`);
                  // }}
                /> */}
                  <span
                    className="text-grey700 line-clamp-2 text-[18px]"
                    key={channelName + index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      // if (!checkIsSignedIn()) {
                      //   return;
                      // }
                      // updateAutoCompleteWordMutate(item);
                      //   callback({ selectedWord: item });
                      return;
                    }}
                  >
                    {channelName}
                  </span>

                  <span className="text-grey600 ml-auto text-[14px]">
                    {compactNumber.format(subscriberCount)}
                  </span>
                </div>
              );
            })}

          {/* <div
            className="border-grey400 border-t-1 text-grey500 flex px-[30px] py-[15px] "
            onMouseDown={(e) => e.preventDefault()}
          >
            <p
              className="cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              자동완성 끄기
            </p>
            <p
              className="ml-auto cursor-pointer"
              onClick={() => {
                inputRef.current?.blur();
              }}
            >
              닫기
            </p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ChannelSearchbar;
