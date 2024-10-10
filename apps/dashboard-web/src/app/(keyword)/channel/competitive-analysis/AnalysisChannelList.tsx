import Image from 'next/image';

import useGetAnalysisChannel from '@/hooks/react-query/query/useGetAnalysisChannel';

const AnalysisChannelList = () => {
  const { data } = useGetAnalysisChannel();

  return (
    <div className="custom-scroll-box h-[360px] overflow-y-scroll px-[20px]">
      {data?.map((item, index) => {
        const compactNumber = new Intl.NumberFormat('ko', {
          notation: 'compact',
        });
        return (
          <div
            className="text-grey600 grid  grid-cols-[40px,3fr,2fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500]"
            key={index}
          >
            {item.channelThumbnail ? (
              <Image
                src={item.channelThumbnail}
                width={40}
                height={40}
                alt={item.channelId}
                className="rounded-full"
              />
            ) : (
              <div className="bg-sky h-10 w-10 rounded-full"></div>
            )}
            <div className="truncate">{item.channelName}</div>
            <div>
              {item.channelSubscribers
                ? compactNumber.format(item.channelSubscribers)
                : item.channelSubscribers}
            </div>
          </div>
        );
      })}
      {!data?.length && (
        <p className="text-grey600 py-[20px] pl-16 text-[14px] font-[500]">
          분석 채널을 등록하세요.
        </p>
      )}
    </div>
  );
};

export default AnalysisChannelList;
