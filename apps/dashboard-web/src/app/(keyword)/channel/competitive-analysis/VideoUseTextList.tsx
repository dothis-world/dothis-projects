import { useVideoUseTextContext } from './VideoUseTextContext';

const VideoUseTextList = () => {
  const { keywordsCounts, topKeywords } =
    useVideoUseTextContext('VideoUseTextList');

  return (
    <div className="border-grey400 rounded-10 ml-auto flex items-center  gap-[20px] border px-[20px] py-[8px]">
      <p className="text-grey600 mr-[10px] text-[14px] font-[500]">
        주요 키워드
      </p>

      {topKeywords?.map((item) => (
        <div
          className="border-grey500 rounded-8 text-grey600 border px-[20px] py-[8px] font-[400]"
          key={item}
        >
          {`${item} (${keywordsCounts?.[item]})`}
        </div>
      ))}
    </div>
  );
};

export default VideoUseTextList;
