import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { MembershipEntityModule } from '@Apps/modules/membership/domain/membership.entity.module';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { GetKeywordByUserHttpController } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.http.controller';
import { GetUserV2CommandHandler } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { PutAgreePromotionHttpController } from '@Apps/modules/user/command/v1/put-agree-promotion/put-agree-promotion.http.controller';
import { PutAgreePromotionCommandHandler } from '@Apps/modules/user/command/v1/put-agree-promotion/put-agree-promotion.command-handler';

import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';
import { ChannelEntityModule } from '@Apps/modules/channel/infrastucture/entities/channel.entity.module';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/channel-data.di-token.constants';
import { MockGetChannelDataAdapter } from '@Apps/modules/channel/infrastucture/adapters/__mock__/get-channel-data.adapter.mock';

const httpControllers = [
  GetKeywordByUserHttpController,
  PutAgreePromotionHttpController,
];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: CHANNEL_DATA_REPOSITORY, useClass: MockGetChannelDataAdapter },
];

const commandHandlers: Provider[] = [
  GetUserV2CommandHandler,
  PutAgreePromotionCommandHandler,
];

const queryHandlers: Provider[] = [];
@Module({
  imports: [
    OpensearchCoreModule,
    CqrsModule,
    UserEntityModule,
    MembershipEntityModule,
    ChannelEntityModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'KAFKA_CLIENT', // injection 시 사용할 name
        useFactory: async (configService: ConfigService) => {
          const kafkaConfigService = new KafkaConfigService(configService);
          return {
            options: kafkaConfigService.getKafkaOptions(),
          };
        },
      },
    ]),
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV2Module {}
