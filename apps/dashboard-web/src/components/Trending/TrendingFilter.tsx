import { Button as DesignButton } from 'dashboard-storybook/src/components/Button/Button';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useState } from 'react';

import { useOpenFilterContext } from '@/app/(main)/(searchGNB)/trending/OpenFilterContext';
import {
  type TrendingQuery,
  useTrendingQueryContext,
} from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import SvgComp from '@/components/common/SvgComp';
import { Button } from '@/components/MainContents/KeywordSearch/style';
import SearchBar from '@/components/Trending/TrendingFilter/SearchBar';

import MultiSelector from './TrendingFilter/MultiSelector';
import WeekDateSlider from './TrendingFilter/WeekDateSlider';

dayjs.extend(isSameOrAfter);

/**
 * 나중에 추가될 수도 있다 (filter의 내용이 휘발되지않도록 기획이 잡히면 state를 부모에서 선언예정)
 */
interface Props {
  categoryList: { value: number; label: string }[];
  setSelectOptions: React.Dispatch<
    React.SetStateAction<{ value: number; label: string }[]>
  >;
  keywordList: string[];
  setKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const TrendingFilter = ({}) => {
  const {
    trendingQueryActions: { setTrendingQuery },
  } = useTrendingQueryContext('TrendingFilter');

  const { setOpenFilter } = useOpenFilterContext('TrendingFilter');

  const [filterCategoryList, setFilterCategoryList] = useState<
    { value: number; label: string }[]
  >([]);

  const [filterKeywordList, setFilterKeywordList] = useState<string[]>([]);

  const [filterStartDate, setFilterStartDate] = useState(
    dayjs().startOf('week').subtract(1, 'week').add(1, 'day'),
  );

  const handleDeleteKeyword = (keyword: string) => {
    setFilterKeywordList((prev) => prev.filter((item) => item !== keyword));
  };

  const handleSetKeywordList = (keyword: string) => {
    setFilterKeywordList((prev) =>
      prev.indexOf(keyword) !== -1 ? prev : [...prev, keyword],
    );
  };

  return (
    <div
      className="bg-grey00 border-l-1 border-grey400 fixed inset-y-0 right-0  z-[200] w-[465px]  px-[26px]
    pt-[80px]"
    >
      <p className="text-grey600 mb-[20px] font-bold">검색 키워드 </p>

      <SearchBar setKeywordList={handleSetKeywordList} />

      <p className="text-grey600 mb-[20px] mt-[80px] font-bold">검색 키워드</p>

      <div className="flex flex-wrap gap-[10px]">
        {filterKeywordList.map((item) => (
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
        ))}
      </div>
      <p className="text-grey600 mb-[20px] mt-[80px] font-bold">
        분석 기간 선택
      </p>
      <WeekDateSlider
        startDate={filterStartDate}
        setStartDate={setFilterStartDate}
      />

      <p className="text-grey600 mb-[20px] mt-[80px]  font-bold  ">카테고리 </p>
      <MultiSelector
        selectOptions={filterCategoryList}
        setSelectOptions={setFilterCategoryList}
      />

      <div className="mt-[80px] flex justify-center gap-[40px]">
        <DesignButton
          size="L"
          theme="contained"
          onClick={() => {
            setTrendingQuery({
              categoryList: filterCategoryList,
              keywordList: filterKeywordList,
              startDate: filterStartDate,
            });
          }}
        >
          적용
        </DesignButton>
        <DesignButton
          size="L"
          theme="outlined"
          onClick={() => setOpenFilter(false)}
        >
          취소
        </DesignButton>
      </div>
    </div>
  );
};

export default TrendingFilter;
