import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IIgnitePagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { Result } from 'oxide.ts';
import { GetVideoPaginatedPageSortDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { GetVideoDataPageV2ServiceInboundPort } from '@Apps/modules/video/domain/ports/get-video-data-page.service.inbound.port';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
export type TGetVideoPage = Result<
  IIgnitePagingRes,
  VideoNotFoundError | TableNotFoundException | VideoHistoryNotFoundError
>;
@QueryHandler(GetVideoPaginatedPageSortDto)
export class FindVideoPageQueryHandler
  implements IQueryHandler<GetVideoPaginatedPageSortDto, TGetVideoPage>
{
  constructor(
    @Inject(VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN)
    private readonly getVideoDataPageService: GetVideoDataPageV2ServiceInboundPort,
  ) {}
  async execute(dto: GetVideoPaginatedPageSortDto): Promise<TGetVideoPage> {
    return await this.getVideoDataPageService.execute(dto);
  }
}
