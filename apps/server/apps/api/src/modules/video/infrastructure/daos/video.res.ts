export interface IVideoSchema {
  videoId: string;
  channelId: string;
  videoTitle: string;
  videoDescription: string;
  videoTags: string;
  videoDuration: number;
  videoPublished: Date;
  videoCategory: string;
  videoInfoCard: boolean;
  videoWithAds: boolean;
  videoEndScreen: boolean;
  videoCluster: number;
  crawledDate: Date;
  year: number;
  month: number;
  day: number;
}
export type CountByDayRes = {
  day: number;
  uniqueVideoCount: number;
};
export interface IGetVideoChannelHistoryRes {
  videoId: string;
  videoViews: number;
  channelId: string;
  channelAverageViews: number;
  year: number;
  month: number;
  day: number;
}
