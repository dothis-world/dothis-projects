import { useMemo } from 'react';

import { useEndMonth, useStartMonth } from '@/store/dateStore';
import {
  handleTimelineDailyView,
  handleTimelineVideoCount,
} from '@/utils/contents/chart';

import useGetTimeline from '../react-query/query/useGetTimeline';

export const useTimelineDailyViewFormatter = ({
  channelId,
}: {
  channelId: string;
}) => {
  const { data: timelineData } = useGetTimeline({
    channelId,
  });

  const startMonth = useStartMonth();
  const endMonth = useEndMonth();

  return useMemo(
    () => handleTimelineDailyView(timelineData, { startMonth, endMonth }),
    [JSON.stringify(timelineData)],
  );
};

export const useTimelineVideoCountFormatter = ({
  channelId,
}: {
  channelId: string;
}) => {
  const { data: timelineData } = useGetTimeline({
    channelId,
  });

  const startMonth = useStartMonth();
  const endMonth = useEndMonth();

  return useMemo(
    () => handleTimelineVideoCount(timelineData, { startMonth, endMonth }),
    [JSON.stringify(timelineData)],
  );
};
