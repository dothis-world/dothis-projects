import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViewsEntity } from './daily-views.entity';
import { VideoEntity } from '@Apps/modules/video/domain/entities/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity, DailyViewsEntity])],
  exports: [TypeOrmModule],
})
export class DailyViewsEntityModule {}
