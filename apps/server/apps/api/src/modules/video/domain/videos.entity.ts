import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { ChannelEntity } from '@Apps/modules/channel/repository/entity/channel.entity';
import { DailyViewsEntity } from '@Apps/modules/hits/domain/repository/entity/daily-views.entity';
@Entity({ name: 'video' })
export class VideoEntity {
  @PrimaryGeneratedColumn({ name: 'video_id' })
  id: string;

  @Column({ name: 'channel_index' })
  channelIndex: number;

  @Column({ name: 'video_title' })
  videoTitle: string;

  @Column({ name: 'video_url' })
  videoUrl: string;

  @Column({ name: 'video_description' })
  videoDescription: string;

  @Column({ name: 'video_duration' })
  videoDuration: number;

  @Column({ name: 'video_published' })
  videoPublished: string;

  @Column({ name: 'video_views' })
  videoViews: string;

  @Column({ name: 'video_likes' })
  videoLikes: number;

  @Column({ name: 'video_tags' })
  videoTags: string;

  @Column({ name: 'video_category' })
  videoCategory: string;

  @Column({ name: 'video_info_card' })
  videoInfoCard: string;

  @Column({ name: 'video_with_ads' })
  videoWithAds: string;

  @Column({ name: 'video_end_screen' })
  videoEndScreen: string;

  @Column({ name: 'video_core_keyword' })
  videoCoreKeyword: string;

  @Column({ name: 'video_average_views' })
  videoAverageViews: number;

  @Column({ name: 'crawl_update_at' })
  crawlUpdateAt: Date;

  @ManyToOne((type) => ChannelEntity, (channel) => channel.id)
  @JoinColumn({ name: 'channel_id' })
  Channel: ChannelEntity;

  @OneToMany((type) => DailyViewsEntity, (dailyViews) => dailyViews.videoId)
  DailyViews: DailyViewsEntity[];
}
