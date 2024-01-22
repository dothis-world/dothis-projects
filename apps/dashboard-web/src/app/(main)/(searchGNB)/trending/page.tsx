'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button as DesignButton } from 'dashboard-storybook/src/components/Button/Button';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import TrendingModal from '@/components/common/Modal/ModalContent/TrendingModal';
import SvgComp from '@/components/common/SvgComp';
import { Button } from '@/components/MainContents/KeywordSearch/style';
import TrendingFilter from '@/components/Trending/TrendingFilter';
import { clustersCategories } from '@/constants/clusterCategories';
import { trendingTableHeaders } from '@/constants/trendingTable';
import useGetTrendingKeywords from '@/hooks/react-query/query/useGetTrendingKeywords';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { useModalActions } from '@/store/modalStore';
import { cn } from '@/utils/cn';
import { convertCompetitionScoreFormat } from '@/utils/contents/competitionScore';

import { useOpenFilterContext } from './OpenFilterContext';
import { useTrendingQueryContext } from './TrendingQueryContext';

export type SortingQuery = {
  sort: (typeof trendingTableHeaders)[number]['key'];
  order: 'asc' | 'desc';
};

const TrendingPage = () => {
  const { trendingQueryOption, setTrendingQueryOption } =
    useTrendingQueryContext('trendingPage');

  const { openFilter, setOpenFilter } = useOpenFilterContext('SearchGNB');

  const [lastId, setLastId] = useState<string | undefined>('');

  const { setModalOpen, setModalContent } = useModalActions();

  const [sortingParams, setSortingParams] = useState<SortingQuery>({
    sort: 'weekly_views',
    order: 'desc',
  });

  const [selectOptions, setSelectOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [keywordList, setKeywordList] = useState<string[]>([]);

  const [startDate, setStartDate] = useState(
    dayjs().startOf('week').subtract(1, 'week').add(1, 'day'),
  );

  const isSignedIn = useIsSignedIn();

  const { setIsOpenSignUpModal } = useAuthActions();

  const router = useRouter();

  const { data, total, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useGetTrendingKeywords({
      selectOptions: trendingQueryOption.selectOptions,
      keywordList: trendingQueryOption.keywordList,
      startDate: trendingQueryOption.startDate,
      order: sortingParams.order,
      sort: sortingParams.sort,
      lastIndex_ID: lastId,
    });

  const handleFetchNextPage = () => {
    if (!isSignedIn) {
      setIsOpenSignUpModal(true);

      setModalContent(<SignUpModal />);
      setModalOpen(true);
      return;
    }

    // if(basic){
    // 회원 레벨 조건
    // }

    fetchNextPageWithCheck();
  };

  const fetchNextPageWithCheck = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleDeleteKeyword = (keyword: string) => {
    setKeywordList((prev) => prev.filter((item) => item !== keyword));
  };

  const sortByTableKey = (
    key: (typeof trendingTableHeaders)[number]['key'],
  ) => {
    if (key === 'rank' || key === 'category') {
      return;
    }
    setSortingParams((prev) => {
      if (prev.sort === key) {
        return { ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { ...prev, sort: key };
    });
  };

  useEffect(() => {
    setLastId(data?.at(-1)?._id);
  }, [JSON.stringify(data)]);

  return (
    <>
      <div className="relative">
        <div className="mx-auto flex max-w-[1342px] items-center gap-[20px]  p-[24px]">
          <h3 className="text-grey600 font-bold">검색 키워드</h3>
          <ul className="flex items-center gap-[10px]">
            {trendingQueryOption.keywordList.map((item) => (
              <li>
                <Button key={item} $active={true}>
                  {item.replace('#', '').replace('*', '')}

                  <SvgComp
                    icon="KeywordDelete"
                    size="1rem"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteKeyword(item);
                    }}
                  />
                  {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-grey200 min-h-[1200px] px-[20px] pb-[300px]">
          <div className=" mx-auto max-w-[1100px] ">
            <div className="flex items-center gap-[28px] py-[30px]">
              <p className="text-grey700 text-[20px] font-bold">
                키워드 {total}개
              </p>
              <p className="text-grey500 font-bold">
                {'2024-01-07 - 2024-01-14'}
              </p>
              <button className="text-primary500 bg-primary100 rounded-8 ml-auto px-4 py-2 text-[14px]">
                엑셀 데이터로 다운로드 받기
              </button>
            </div>
            <div className="bg-grey00 rounded-8 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
              <div className="grid grid-cols-[40px_140px_140px_140px_140px_140px_160px_80px] gap-[12px] py-[30px] pl-[18px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
                {trendingTableHeaders.map(({ label, key }) => (
                  <div
                    key={key}
                    className={cn(
                      'text-grey500 before:bg-grey00 relative mx-auto w-fit cursor-pointer text-center text-[14px] font-bold ',
                      {
                        ' before:absolute before:right-[-12px] before:top-1/2  before:mt-[-9px]  before:block before:h-0 before:w-0 before:border-4 before:border-transparent before:border-b-[#bfbfbf] after:absolute after:right-[-12px] after:top-1/2 after:mt-[1px] after:block after:h-0 after:w-0 after:border-4 after:border-transparent after:border-t-[#bfbfbf]':
                          key !== 'rank' && key !== 'category',
                        'before:border-b-[#000]':
                          sortingParams.sort === key &&
                          sortingParams.order === 'asc',
                        'after:border-t-[#000]':
                          sortingParams.sort === key &&
                          sortingParams.order === 'desc',
                      },
                    )}
                    onClick={() => {
                      sortByTableKey(key);
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <ul>
                {data?.map((item, index, arr) => (
                  <li
                    key={index}
                    className={cn(
                      'grid grid-cols-[40px_140px_140px_140px_140px_140px_160px_80px] pl-[18px] items-center gap-[12px] group',
                      {
                        'shadow-[inset_0_-2px_0_0_#f4f4f5]':
                          index !== arr.length - 1 || hasNextPage,
                      },
                    )}
                  >
                    <div className=" items-center gap-[10px]">
                      <div className="text-grey700 py-[26px]  text-center text-[14px] font-bold ">
                        {Number(item._id) + 1}
                      </div>
                    </div>
                    <div className="text-grey700 py-[26px]text-[14px] text-center font-bold ">
                      {item._source.keyword}
                    </div>
                    <div className="text-grey700 py-[26px]  text-center text-[14px]  font-bold">
                      {
                        clustersCategories[
                          JSON.parse(
                            item._source.category,
                          )[0] as keyof typeof clustersCategories
                        ]
                      }
                    </div>
                    <div className="text-grey700 py-[26px]  text-center text-[14px]  font-bold">
                      {item._source.weekly_views?.toLocaleString('ko-kr')}
                    </div>
                    <div className="text-grey700 py-[26px]  text-center text-[14px] font-bold ">
                      {item._source.video_count?.toLocaleString('ko-kr')}
                    </div>
                    <div className="text-grey700 py-[26px] text-center text-[14px]  font-bold">
                      {convertCompetitionScoreFormat(item._source.competitive)}
                    </div>
                    <div className="text-grey700 py-[26px] text-center text-[14px] font-bold ">
                      {item._source.mega_channel?.toLocaleString('ko-kr')}
                    </div>
                    <div className="invisible group-hover:visible">
                      <Dialog.Trigger
                        asChild
                        onClick={() =>
                          setModalContent(
                            <TrendingModal keyword={item._source.keyword} />,
                          )
                        }
                      >
                        <DesignButton theme="outlined" size="S">
                          자세히
                        </DesignButton>
                      </Dialog.Trigger>
                    </div>
                  </li>
                ))}
                <div className="flex justify-center py-[42px]">
                  <DesignButton
                    theme="outlined"
                    size="L"
                    onClick={handleFetchNextPage}
                  >
                    더보기
                  </DesignButton>
                </div>
              </ul>
            </div>

            {openFilter && (
              <TrendingFilter
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                keywordList={keywordList}
                setKeywordList={setKeywordList}
                startDate={startDate}
                setStartDate={setStartDate}
                setTrendingQueryOption={setTrendingQueryOption}
                setOpenFilter={setOpenFilter}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingPage;
