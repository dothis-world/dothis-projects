import { DailyViewsEntity } from '@Apps/modules/hits/domain/entities/daily-views.entity';
import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';
import { DailyViewsRepositoryPort } from '../../domain/ports/daily-views.repository.port';
import { DataSource, Repository } from 'typeorm';
import { DailyViewModel, zDailyViewSchema } from '@dothis/dto';
import { ZodObject } from 'zod';
import { InjectRepository } from '@nestjs/typeorm';

export class DailyViewsRepository
  extends SqlRepositoryBase<DailyViewsEntity, DailyViewModel>
  implements DailyViewsRepositoryPort
{
  @InjectRepository(DailyViewsEntity)
  protected repository: Repository<DailyViewsEntity>;

  protected tableName = 'hits';

  protected schema: ZodObject<any> = zDailyViewSchema;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findDailyView(
    videoIdx: string[],
    from: string,
    to: string,
  ): Promise<DailyViewsEntity[]> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .select('*')
      .where('video_id IN (:...videos)', { videos: videoIdx })
      .andWhere('crawl_update_at >= :from', { from: from })
      .andWhere('crawl_update_at <= :to', { to: to })
      .getRawMany();
  }
}
