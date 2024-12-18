import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViewsEntity } from '@Apps/modules/hits/domain/entities/daily-views.entity';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity, DailyViewsEntity])],
  exports: [TypeOrmModule],
})
export class VideosEntityModule {}
