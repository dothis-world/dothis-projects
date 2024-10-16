import { cn } from '@/utils/cn';

import { useVideoUseTextContext } from './VideoUseTextContext';
import { useVideoUseTextFilterContext } from './VideoUseTextFilterContext';

const VideoUseTextList = () => {
  const { keywordsCounts, topKeywords } =
    useVideoUseTextContext('VideoUseTextList');

  const { filterKeywords, setFilterKeywords } =
    useVideoUseTextFilterContext('VideoUseTextList');

  const handleFilterKeyword = (keyword: string) => {
    if (filterKeywords?.includes(keyword)) {
      setFilterKeywords((prev) => {
        const updatedKeywords = prev ?? []; // prev가 null이면 빈 배열로 설정
        return updatedKeywords.filter((item) => item !== keyword);
      });
    } else {
      setFilterKeywords((prev) => {
        const updatedKeywords = prev ?? []; // prev가 null이면 빈 배열로 설정

        return [...updatedKeywords, keyword];
      });
    }
  };

  return (
    <div className="border-grey400 rounded-10 ml-auto flex items-center  gap-[20px] border px-[20px] py-[8px]">
      <p className="text-grey600 mr-[10px] text-[14px] font-[500]">
        주요 키워드
      </p>

      {topKeywords?.map((item) => (
        <div
          className={cn(
            'border-grey500 rounded-8 text-grey600 border px-[20px] py-[8px] font-[400] cursor-pointer transition-all duration-300',
            {
              'bg-primary50 text-primary500 border-primary500':
                filterKeywords?.includes(item),
            },
          )}
          key={item}
          onClick={() => handleFilterKeyword(item)}
        >
          {`${item} (${keywordsCounts?.[item]})`}
        </div>
      ))}
    </div>
  );
};

export default VideoUseTextList;
