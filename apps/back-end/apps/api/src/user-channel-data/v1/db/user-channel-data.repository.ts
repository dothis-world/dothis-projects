import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataRepositoryPort } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository.port';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { UserChannelDataModel, zUserChannelData } from '@dothis/share/lib/dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserChannelDataRepository
  extends SqlRepositoryBase<UserChannelData, UserChannelDataModel>
  implements UserChannelDataRepositoryPort
{
  protected tableName = 'UserChannelData';
  protected schema = zUserChannelData;
  protected readonly repository: Repository<UserChannelData>;

  async findOneByUserId(userId: string): Promise<UserChannelData> {
    return await this.repository
      .createQueryBuilder('UserChannelData')
      .where({ userId })
      .getOne();
  }
}
