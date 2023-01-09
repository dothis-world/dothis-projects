import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserChannelDataV1ApiModule } from './v1/UserChannelData-v1.module';
import { UserChannelDataModule as UserChannelDataEntityModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';

@Module({
  imports: [
    UserChannelDataEntityModule,
    UserChannelDataV1ApiModule,
    RouterModule.register([{ path: 'v1', module: UserChannelDataV1ApiModule }]),
  ],
})
export class UserChannelDataApiModule {}
