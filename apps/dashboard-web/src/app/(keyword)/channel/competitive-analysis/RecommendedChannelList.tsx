import Image from 'next/image';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetChannelList from '@/hooks/react-query/query/useGetChannelList';
import useGetSimilarChannel from '@/hooks/react-query/query/useGetSimilarChannel';
import useGetSimilarChannelRouteHandler from '@/hooks/react-query/query/useGetSimilarChannelRouteHandler';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { cn } from '@/utils/cn';

import { useChannelFilterContext } from './ChannelFilterContext';

const RecommendedChanelList = () => {
  const { channelCategory, subscriberRange } = useChannelFilterContext(
    'RecommededChannelList',
  );

  const { data } = useGetChannelList({
    channelCluster: channelCategory?.value,

    subscriberRange: subscriberRange?.value,
  });

  const { data: userData } = useGetUserInfo();

  const { data: similarChannel } = useGetSimilarChannel({
    channelId: userData?.channelId,
  });

  const { data: test } = useGetSimilarChannelRouteHandler({
    channelId: 'UC72V934gDqmHztP9xJZhpDg',
    cluster: 0,
    subscribers: 146000,
    keyword: ['따복', '수급자', '의료급여', '생계급여', '혜택'],
    tags: [
      '기초수급자',
      '기초생활수급자',
      '기초생활보장제도',
      '차상위계층',
      '저소득층',
    ],
  });

  // {
  //   channelId: 'UC82g8Uzff-bcM_SwKcos8sg',
  //   cluster: 14,
  //   subscribers: 68900,
  //   keyword: ['짱민호', '세로직캠', 'MC', '직캠', '세로'],
  //   tags: [
  //     '민호랜드',
  //     '호시절',
  //     '장민호콘서트',
  //     '트롯챔피언',
  //     '화요일은밤이좋아',
  //   ],
  // }

  console.log(test);
  return (
    <div className="custom-scroll-box relative h-[320px] overflow-hidden px-[20px]">
      <div
        className={cn('pointer-events-none', {
          'blur-sm': !userData?.channelId,
        })}
      >
        {data?.data.map(
          (
            {
              channelId,
              channelName,
              channelSubscribers,
              channelThumbnail,
              channelCluster,
              channelAverageViews,
              mainUsedKeywords,
              channelTotalVideos,
            },
            index,
          ) => {
            const compactNumber = new Intl.NumberFormat('ko', {
              notation: 'compact',
            });

            return (
              <div key={channelId + index}>
                <div
                  className="text-grey600 grid cursor-pointer  grid-cols-[40px,5fr,2fr,2fr,2fr,5fr,2fr,1.5fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500] "
                  onClick={(e) => {}}
                >
                  {channelThumbnail ? (
                    <Image
                      src={channelThumbnail}
                      width={40}
                      height={40}
                      alt={channelId}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-sky h-10 w-10 rounded-full"></div>
                  )}
                  <div className="truncate">{channelName}</div>
                  <div className="text-center">
                    {channelSubscribers
                      ? compactNumber.format(channelSubscribers)
                      : channelSubscribers}
                  </div>
                  <div className="text-center">{channelTotalVideos}</div>
                  <div className="truncate text-center">
                    {clustersCategories[channelCluster]}
                  </div>
                  <div className="truncate">{mainUsedKeywords.join(',')}</div>
                  <div className="text-center">
                    {channelAverageViews
                      ? channelAverageViews?.toLocaleString('ko-kr')
                      : channelAverageViews}
                  </div>
                  <div className="text-center">90%</div>
                </div>
              </div>
            );
          },
        )}
      </div>

      {!userData?.channelId && (
        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              채널을 등록하면 AI가 채널을 추천해드립니다.{' '}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedChanelList;
