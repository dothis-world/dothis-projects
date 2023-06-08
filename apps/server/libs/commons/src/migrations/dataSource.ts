import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Membership } from 'apps/api/src/config/database/domain/entities/membership/membership.entity';
import { DailyViewsEntity } from 'apps/api/src/modules/daily_views/repository/entity/daily-views.entity';
import { User } from 'apps/api/src/modules/user/repository/entity/user.entity';
import { ChannelEntity } from 'apps/api/src/modules/channel/repository/entity/channel.entity';
import { VideoEntity } from 'apps/api/src/modules/video/repository/db/videos.entity';

const configService = new ConfigService();
config();
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('MYSQL_ROOT_USER'),
  password: configService.get('MYSQL_ROOT_PASSWORD'),
  database: configService.get('DB_SCHEMA'),
  entities: [User, Membership, DailyViewsEntity, ChannelEntity, VideoEntity],
  migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
});
