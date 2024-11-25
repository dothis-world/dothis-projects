import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';
import { TRequestVideoModel, zRequestVideoSchema } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { RequestVideoEntity } from '@ExternalApps/feature/crawl-queue/video/domain/entities/request-video.entity';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { DeleteReqVideoDao } from '@ExternalApps/feature/crawl-queue/video/infrastructure/dao/delete-req-video.dao';

export class RequestVideoRepository
  extends SqlRepositoryBase<RequestVideoEntity, TRequestVideoModel>
  implements ReqVideoOutboundPort
{
  @InjectRepository(RequestVideoEntity)
  protected repository: Repository<RequestVideoEntity>;

  protected tableName: string = 'request_video';

  protected schema: ZodObject<any> = zRequestVideoSchema;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  async deleteByVodIdEtc(dao: DeleteReqVideoDao): Promise<boolean> {
    try {
      const res = await this.repository
        .createQueryBuilder(this.tableName)
        .delete()
        .from(this.tableName)
        .where({
          videoId: dao.videoId,
          vodId: dao.vodId,
          usersClientId: dao.clientId,
        })
        .execute();
      return res.affected > 0;
    } catch (e) {
      console.error(e);
    }
  }

  async findOneByWebHookUrlAndMatchToken(
    url: string,
    token: string,
  ): Promise<boolean> {
    try {
      const res: RequestVideoEntity[] = await this.repository
        .createQueryBuilder(this.tableName)
        .select(['webhook_url', 'token', 'update_date'])
        .where({ webhookUrl: url })
        .orderBy('update_date', 'ASC')
        .limit(1)
        .execute();
      return res[0].token === token;
    } catch (e) {
      console.error(e);
    }
  }
}
