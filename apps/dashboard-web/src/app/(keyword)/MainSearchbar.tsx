'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

import SvgComp from '@/components/common/SvgComp';
import MyKeywordList from '@/components/MainContents/KeywordSearch/MyKeywordList';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useDebounce from '@/hooks/useDebounce';
import { useIsSignedIn } from '@/store/authStore';
import { convertKeywordsToArray } from '@/utils/keyword';

const MainSearchbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

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

  const isSignedIn = useIsSignedIn();

  const handleInput = useDebounce((input) => setSearchInput(input), 200, [
    searchInput,
  ]);

  //   const { setIsModalOpen, setModalContent } = useModalActions();

  const { data: userData } = useGetUserInfo();

  const { data } = useGetAutoCompleteWord(searchInput);

  const keyword = convertKeywordsToArray(userData?.personalizationTag);

  //   const checkIsSignedIn = () => {
  //     if (isSignedIn) return true;
  //     setOpenInput(false);
  //     setIsOpenSignUpModal(true);
  //     // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.

  //     setModalContent(<SignUpModal />);
  //     setIsModalOpen(true);
  //     return false;
  //   };

  //   const handleKeyDown = (
  //     event: KeyboardEvent<HTMLInputElement>,
  //     currentInput: string,
  //   ) => {
  //     if (!checkIsSignedIn()) {
  //       return;
  //     }

  //     if (event.key === 'Enter') {
  //       if (
  //         data &&
  //         data?.filter((item) => item.endsWith('*'))[0]?.replace('*', '') ===
  //           currentInput
  //       ) {
  //         // 엔터 키가 눌렸을 때 실행할 동작

  //         createSearchwordMutate(currentInput);
  //       }
  //     }
  //   };

  return (
    <div className="relative mx-auto mb-[108px] w-[630px]">
      <div className="border-primary200 flex w-full items-center rounded-[40px] border px-[30px] py-[14px]">
        {isFocused ? (
          <SvgComp icon="SideLogo" size={24} className="mr-[24px]" />
        ) : (
          <SvgComp
            icon="SearchIcon"
            size={16}
            className="mr-[10px] [&_path]:fill-[#F0516D]"
          />
        )}

        <input
          className="text-grey600  placeholder:text-primary500 w-full   text-[16px] outline-none placeholder:pr-[26px]  placeholder:text-center focus:placeholder:text-left"
          placeholder="키워드를 넣어주세요"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.currentTarget.value);
            startTransition(() => handleInput(e.currentTarget.value));
          }}
          // ref={searchInputRef}
          //   onKeyDown={(e) => {
          //     handleKeyDown(e, e.currentTarget.value);
          //   }}
        />

        {isFocused && (
          <SvgComp
            icon="SearchIcon"
            size={16}
            className="ml-auto [&_path]:fill-[#F0516D]"
          />
        )}
      </div>

      {isFocused && (
        <div className="border-primary200  bg-grey00 absolute z-10 mt-[10px] inline-flex w-full flex-col gap-[12px] rounded-[20px] border px-[30px] py-[20px]">
          {!!data?.length ? (
            data
              ?.filter((item) => item.endsWith('*'))
              .slice(0, 5)
              .map((item) => {
                const regex = new RegExp(`(${input})`, 'gi');
                return (
                  <div
                    className="text-grey900 flex cursor-pointer items-center text-[16px]"
                    //   onClick={() => {
                    //     if (!checkIsSignedIn()) {
                    //       return;
                    //     }
                    //     createSearchwordMutate(item.replace('*', ''));
                    //     return;
                    //   }}
                    key={item}
                  >
                    <SvgComp
                      icon="BorderSearchIcon"
                      size={24}
                      className="mr-[24px]"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   e.stopPropagation();

                      //   console.log('check');
                      //   router.push(`/keyword/${item.replace('*', '')}`);
                      // }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        router.push(`/keyword/${item.replace('*', '')}`);
                      }}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item
                          .replace('*', '')
                          .replace(
                            regex,
                            '<span style="font-weight: bold; ">$1</span>',
                          ),
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        router.push(`/keyword/${item.replace('*', '')}`);
                      }}
                    />
                  </div>
                );
              })
          ) : (
            <>
              <p className="text-grey500 text-[14px]">두디스 추천 검색어</p>

              <div className="mt-[20px] flex flex-wrap gap-[10px]  ">
                {isSignedIn &&
                  keyword.map((item) => (
                    <div
                      className="border-grey400 rounded-[40px] border px-[10px] py-[7px] text-[14px] font-bold"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSearchbar;