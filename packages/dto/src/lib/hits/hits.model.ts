import { z } from 'zod';
import { dataObject, zTotalData, zSortQuery } from '../common.model';
import { zChannelHistoryModel } from '../channel-history';

export const zDailyViewData = z.object({
  date: z.string(),

  uniqueVideoCount: z.number().describe('해당하는 날짜의 산정 비디오수'),

  increaseComments: z.number().describe('비디오 코멘트 수'),

  increaseLikes: z.number().describe('비디오 좋아요 수'),

  increaseViews: z.number().describe('비디오 조회수'),
});

export const zDailyViews = dataObject(z.array(zDailyViewData));

/**
 * weekly-view models
 */
export const zCreateWeeklyKeywordsListSourceSchema = z
  .object({
    id: z.number().int().positive().describe('조회수의 고유 식별자'),
    ranking: z.number().int().positive().nullable().describe('조회수의 순위'),
    keyword: z.string().max(30).describe('탐색어'),
    category: z.string().max(30).describe('연관어'),
    weekly_views: z.number().int().positive().describe('주간 조회수'),
    video_count: z.number().int().positive().describe('비디오 수'),
    competitive: z.number().int().describe('경쟁강도'),
    mega_channel: z
      .number()
      .int()
      .positive()
      .describe('10만이상 구독자 채널 수'),
    changes: z.number().int().describe('순위 변동'),
    YEAR: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe('조회수 레코드의 연도'),
    MONTH: z
      .number()
      .int()
      .positive()
      .min(1)
      .max(12)
      .nullable()
      .describe('조회수 레코드의 월'),
    DAY: z
      .number()
      .int()
      .positive()
      .min(1)
      .max(31)
      .nullable()
      .describe('조회수 레코드의 일'),
  })
  .strict();
export const SortOrderQuery = Object.keys(
  zCreateWeeklyKeywordsListSourceSchema.shape,
);

export const zWeeklyKeywordsListSourceSchema =
  zCreateWeeklyKeywordsListSourceSchema;

export const zWeeklyKeywordsListArray = z.array(
  zCreateWeeklyKeywordsListSourceSchema,
);
export const zWeeklyKeywordsList = dataObject(
  zTotalData.merge(dataObject(zWeeklyKeywordsListArray)),
);

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;

export const zSortWeeklyViews = zSortQuery(SortOrderQuery);
export type WeeklyHitsModel = z.TypeOf<typeof zWeeklyKeywordsListSourceSchema>;

export const zCombinedViewsData = z.object({
  date: z.string().describe('날짜, yyyy-mm-dd 형식을 권장'),

  // 일일 조회수 데이터
  uniqueVideoCount: z
    .number()
    .optional()
    .describe('해당하는 날짜의 산정 비디오수'),
  increaseComments: z.number().optional().describe('비디오 코멘트 수 증가분'),
  increaseLikes: z.number().optional().describe('비디오 좋아요 수 증가분'),
  increaseViews: z.number().describe('비디오 조회수 증가분'),

  // 기대 조회수 데이터
  expectedHits: z.number().describe('기대 조회수'),
  maxPerformance: z.number().describe('최대 성능'),
  minPerformance: z.number().min(0).describe('최소 성능 (0 이상)'),
});

export const zExpectedViewsData = z.object({
  date: z.string().describe('yyyy-mm-dd 형식'),
  expectedHits: z.number().describe('기대 조회수'),
  maxPerformance: z.number().describe('최대 성능'),
  minPerformance: z.number().min(0).describe('최소 성능 (0 이상)'),
});

export const zExpectedViewsArr = z.array(zExpectedViewsData);

export const zExpectedViews = z.object({
  data: zExpectedViewsArr,
});

export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;

export type TExpectedViewsRes = z.TypeOf<typeof zExpectedViews>;

export type TExpectedViewsArr = z.TypeOf<typeof zExpectedViewsArr>;

export type TAnalysisViewsRes = z.TypeOf<typeof zCombinedViewsData>;
