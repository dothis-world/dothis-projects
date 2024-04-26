import { z } from 'zod';
import { zDateQuery, zPaginatedQuery, zSearchKeyword } from '../common.model';
import { zVideo, zVideoModel } from './video.model';

export const zClusterQueryParams = z.object({
  cluster: z.string(),
});
export const zClusterPathParams = z.object({
  clusterNumber: z
    .string()
    .describe('찾을 비디오의 클러스터 번호 값을 입력받습니다.')
    .default('0'),
});

export const findVideoBySearchKeyword = zSearchKeyword.merge(zDateQuery);

export const zFindVideoBySearchKeyword = findVideoBySearchKeyword;

export const findVideoBySearchKeywordClusterNumber = zSearchKeyword
  .merge(zDateQuery)
  .merge(zClusterPathParams);

export const findVideoPageQuery = zSearchKeyword.merge(zPaginatedQuery);
export const zFindVideoPageWithClusterQuery = zSearchKeyword
  .merge(zPaginatedQuery)
  .merge(zClusterQueryParams);

export type IKeyword = z.TypeOf<typeof zSearchKeyword>;
export type IPageQuery = z.TypeOf<typeof zPaginatedQuery>;
export type TPageWithClusterQueryQuery = z.TypeOf<
  typeof zFindVideoPageWithClusterQuery
>;

export type VideoModel = z.TypeOf<typeof zVideoModel>;

/**
 * 개별 비디오
 * */

export const zPredictionStatus = z.enum(['INSUFFICIENT_DATA', 'PREDICTING']);

export const VideoPerformance = z.object({
  expectedViews: z.number(),
  participationRate: z.number(),
});

export const zPredictedViews = z.object({
  date: z.string(),
  predictedViews: z.number(),
});

export const zVideoPrediction = z.object({
  status: zPredictionStatus,
  dailyViews: z.array(zPredictedViews).nullable(),
});

export const ChannelPerformance = z.object({
  subscribers: z.number(),
  averageViews: z.number(),
});

export const zVideoDetails = z.object({
  data: z.object({
    videoTags: z.string(),
    videoPerformance: VideoPerformance,
    videoPrediction: zVideoPrediction,
    channelPerformance: ChannelPerformance,
  }),
});
/*
 * 연간 비디오수 v2
 */
export const zFindAccumulateQuery = findVideoBySearchKeyword;
export const zFindIndividualVideoInfoParams = zClusterPathParams.merge(
  z.object({
    videoId: z
      .string()
      .default('Mm-8O8iFmao')
      .describe('찾을 비디오의 id 값을 입력받습니다.'),
  }),
);
/**
 * getVideoAdsInfo
 */

export const zGetVideoAdsInfoRes = z.object({
  numberOfAdVideos: z
    .number()
    .describe('The number of videos that contain advertisements.'),
  averageViewCount: z
    .number()
    .describe('The average number of views across all videos.'),
  totalVideos: z
    .number()
    .describe('The total number of videos in the dataset.'),
});
export const zGetAdsRelatedTopHits = zFindVideoBySearchKeyword
  .omit({ related: true })
  .merge(zPaginatedQuery.pick({ limit: true }))
  .merge(z.object({ related: z.string().describe('연관어').default('강원') }));

export const zGetAdsRelatedTopHitsRes = zVideo.pick({
  videoPublished: true,
  videoTitle: true,
  videoViews: true,
});

// 개별 구간별 결과 스키마
const zPerformanceLengthSegment = z.object({
  segment: z.string().describe('구간'), // 구간을 나타내는 문자열, 예: "90-150"
  averageViews: z.number().describe('평균 조회수'), // 해당 구간 영상의 평균 조회수
  midpoint: z.number().describe('x축, 해당 구간의 기준점'), //해당 구간의 기준점
  averagePerformance: z.number().describe('평균 성과'), // 해당 구간 영상의 평균 성과 점수
});

// 전체 응답 스키마
export const zGetPerformanceLengthRes = z
  .object({
    segments: z.array(zPerformanceLengthSegment).describe('구간별 분석 결과'), // 구간별 분석 결과 배열
    totalVideos: z.number().optional().describe('전체 분석된 영상의 수'), // 선택적: 전체 분석된 영상의 수
    maxViews: z.number().optional().describe('최대 조회수'), // 선택적: 모든 구간에서의 최대 조회수
    maxPerformance: z.number().optional().describe('최대 성과'), // 선택적: 모든 구간에서의 최대 성과 점수
    analysisDate: z.string().optional().describe('분석 날짜'), // 선택적: 분석을 수행한 날짜
  })
  .describe('영상 길이별 조회수 및 성과 분석 결과');

// 타입 추출
export type TFindPerformanceLengthRes = z.infer<
  typeof zGetPerformanceLengthRes
>;

export type GetVideoAdsInfoRes = z.TypeOf<typeof zGetVideoAdsInfoRes>;
export type GetAdsRelatedTopHitsRes = z.TypeOf<typeof zGetAdsRelatedTopHitsRes>;
