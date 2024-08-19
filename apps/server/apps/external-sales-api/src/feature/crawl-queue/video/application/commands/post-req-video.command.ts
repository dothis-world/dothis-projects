import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { POST_REQUEST_VIDEO_SERVICE_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { PostReqVideoInboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.inbound.port';
import { Result } from 'oxide.ts';
import { PostRequestVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/post-req-video.dto';
import {
  InvalidYoutubeUrlException,
  DuplicateException,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { TVideoVideoResponse } from '@dothis/dto';
import { WebhookUrlTokenMismatchException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/webhook-response-failed.exception';
export type TPostRequestVideoRes = Result<
  TVideoVideoResponse,
  | DuplicateException
  | InternalServerErrorException
  | InvalidYoutubeUrlException
  | WebhookUrlTokenMismatchException
  | VideoNotFoundException
>;
@CommandHandler(PostRequestVideoDto)
export class PostReqVideoCommandHandler
  implements ICommandHandler<PostRequestVideoDto, TPostRequestVideoRes>
{
  constructor(
    @Inject(POST_REQUEST_VIDEO_SERVICE_TOKEN)
    private readonly PostVideoService: PostReqVideoInboundPort,
  ) {}
  async execute(command: PostRequestVideoDto): Promise<TPostRequestVideoRes> {
    return await this.PostVideoService.execute(command);
  }
}
