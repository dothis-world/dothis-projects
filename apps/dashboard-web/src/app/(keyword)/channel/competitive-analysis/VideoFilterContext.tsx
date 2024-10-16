import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

import type { SortingQuery } from '@/types/common';

export type VideoSort = 'video_published' | 'video_views';

interface VideoSortOption {
  value: SortingQuery<VideoSort>;
  label: string;
}

interface DatePeriodOption {
  value: string;
  label: string;
}

interface VideoUseTextState {
  videoSortOption: VideoSortOption;
  setVideoSortOption: React.Dispatch<React.SetStateAction<VideoSortOption>>;

  datePeriodFilter: DatePeriodOption;
  setDatePeriodFilter: React.Dispatch<React.SetStateAction<DatePeriodOption>>;
}

const VideoFilterContext = createContext<VideoUseTextState | null>(null);

export const useVideoFilterContext = (componentName: string) => {
  const context = useContext(VideoFilterContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <VideoFilterContext>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const defaultVideoSortOption: VideoSortOption = {
  label: '조회수 순',
  value: {
    order: 'desc',
    sort: 'video_views',
  },
};

const defaultDatePeriodFilter = {
  label: '최근 1년',
  value: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
};

const VideoFilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [videoSortOption, setVideoSortOption] = useState<VideoSortOption>(
    defaultVideoSortOption,
  );

  const [datePeriodFilter, setDatePeriodFilter] = useState<DatePeriodOption>(
    defaultDatePeriodFilter,
  );

  return (
    <VideoFilterContext.Provider
      value={{
        videoSortOption,
        setVideoSortOption,
        datePeriodFilter,
        setDatePeriodFilter,
      }}
    >
      {children}
    </VideoFilterContext.Provider>
  );
};

export default VideoFilterContextProvider;
