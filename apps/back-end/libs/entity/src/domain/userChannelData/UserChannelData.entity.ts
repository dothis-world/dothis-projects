import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
@Entity({ name: 'UserChannelData' })
export class UserChannelData {
  @PrimaryGeneratedColumn({ name: 'channel_id' })
  channelId: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column({ name: 'channel_name' })
  channelName: string;

  @Column({ name: 'channel_videos' })
  channelVideos: number;

  @Column({ name: 'channel_describer' })
  channelDescriber: number;

  @Column({ name: 'channel_views' })
  channelViews: number;

  @Column({ name: 'channel_keywords' })
  channelKeywords: string;

  @Column({ name: 'channel_used_tags' })
  channelUsedTags: string;

  @Column({ name: 'channel_tags' })
  channelTags: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne((type) => User, (user) => user.UserChannelData)
  User: User;
}
