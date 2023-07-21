import { Module, Provider } from '@nestjs/common';
import { FindVideoHttpController } from '@Apps/modules/video/queries/v1/find-video/find-video.http.controller';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FindVideoHandler } from '@Apps/modules/video/queries/v1/find-video/find-video.service';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: VIDEO_DI_TOKEN.FIND_VIDEO_DATA_REPOSITORY_BY_OS,
    useClass: VideoQueryHandler,
  },
  FindVideoHandler,
];
@Module({
  imports: [CqrsModule, AwsModule],
  controllers: [FindVideoHttpController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV1Module {}
