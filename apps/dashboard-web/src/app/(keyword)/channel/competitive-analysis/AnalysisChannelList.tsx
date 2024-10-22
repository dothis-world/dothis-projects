import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';

import useDeleteAnalysisChannel from '@/hooks/react-query/mutation/useDeleteAnalysisChannel';
import useGetAnalysisChannel from '@/hooks/react-query/query/useGetAnalysisChannel';

const YOUTUBE_URL = 'https://www.youtube.com';

const AnalysisChannelList = () => {
  const { data } = useGetAnalysisChannel();

  const { mutate } = useDeleteAnalysisChannel();

  const { show, hideAll } = useContextMenu();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const onContextMenu = ({ event, id }: { event: any; id: string }): void => {
    show({
      event,
      id,
    });
  };

  const handleContextMenuClick = (
    type: 'delete_channel' | 'move_channel',
    channelId: string,
  ) => {
    if (type === 'delete_channel') {
      mutate(channelId);
      return;
    }

    window.open(`${YOUTUBE_URL}/channel/${channelId}`, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      // 드롭다운 닫기 로직을 추가 (react-contexify scroll 시 hide 이벤트는 browser event에 바인딩 되어있어서 독립적인 div overflow에 미적용 이슈)
      hideAll();
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="custom-scroll-box h-[360px] overflow-y-scroll px-[20px]"
      ref={scrollContainerRef}
    >
      {data?.map((item, index) => {
        const compactNumber = new Intl.NumberFormat('ko', {
          notation: 'compact',
        });
        return (
          <div
            className="text-grey600 grid  grid-cols-[40px,3fr,2fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500]"
            key={index}
            onClick={(e) =>
              onContextMenu({
                event: e,
                id: item.channelId + index + '분석채널',
              })
            }
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

            <Menu id={item.channelId + index + '분석채널'}>
              {[
                {
                  title: '유튜브 채널로 이동',
                  value: 'move_channel' as const,
                },
                {
                  title: '모니터링 제거',
                  value: 'delete_channel' as const,
                },
              ].map(({ title, value }) => (
                <Item
                  key={value}
                  className="[&_*]:hover:!bg-primary200"
                  // react-contexify 스타일 우선순위로 인한 important 추가 (css 파일을 별도로 만들기 대신 사용)
                  onClick={() => handleContextMenuClick(value, item.channelId)}
                >
                  {/* <SvgComp icon="CheckIcon" size={12} /> */}

                  {title}
                </Item>
              ))}
            </Menu>
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
