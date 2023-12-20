'use client';

import { useMemo } from 'react';

import type { ResponseType, VideoCount } from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { getCompetitionScore } from '@/utils/contents/competitionScore';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import AnalysisWidgetList from './AnalysisWidgetList';
import CumulativeVideoChart from './CumulativeVideoChart';
import DailyView from './DailyView';
import ViewChart from './ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const KeywordAnalyticsView = () => {
  const selectedWord = useSelectedWord();
  const { data: dailyViewData } = useGetDailyView(selectedWord);

  const startDate = useStartDate();
  const endDate = useEndDate();

  const dailyViewChartData = useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        '일일 조회 수',
      ),
    [dailyViewData],
  );

  const lastDailyView = dailyViewChartData[0].data.at(-1)?.y;

  const { data: expectedViewData } = useGetExpectedView(selectedWord);

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(
        averageViews(expectedViewData.flat(), { startDate, endDate }),
        '기대 조회 수',
      ),
    [expectedViewData],
  );

  const lastExpectedView = expectedViewChartData[0].data.at(-1)?.y;

  const { data: videoCountData } = useGetVideoCount(selectedWord);

  const { totalCount, videoCountViewChartData } = useMemo(
    () =>
      videoCountData.reduce<{
        totalCount: number;
        videoCountViewChartData: ResponseType;
      }>(
        (acc, dataItem) => {
          acc.totalCount += dataItem?.videoTotal || 0;
          dataItem?.section.forEach((sectionItem) => {
            const key = sectionItem.section;

            if (key in CONVERT_SUBSCRIBERANGE) {
              const existingRange = CONVERT_SUBSCRIBERANGE[key as VideoCount];
              const existingItem =
                acc.videoCountViewChartData[key as VideoCount];

              if (existingItem) {
                existingItem.value += sectionItem.number;
              } else {
                acc.videoCountViewChartData[key as VideoCount] = {
                  id: existingRange,
                  label: existingRange,
                  value: sectionItem.number,
                };
              }
            }
          });

          return acc;
        },
        {
          totalCount: 0,
          videoCountViewChartData: {},
        } as {
          totalCount: number;
          videoCountViewChartData: ResponseType;
        },
      ),
    [videoCountData],
  );

  // 경쟁강도 구하는 로직 lastDailyView 절대값 설정도 고려해봐야함
  const competitionScore = getCompetitionScore(lastDailyView, totalCount);

  return (
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <AnalysisWidgetList
        expectedView={lastExpectedView || 0}
        competitionScore={competitionScore}
      />
      <div className="flex h-[520px] w-full">
        <ViewChart />
        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <DailyView view={lastDailyView || 0} />
          <CumulativeVideoChart
            totalCount={totalCount}
            videoCountsBySection={Object.values(
              videoCountViewChartData,
            ).reverse()}
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalyticsView;
