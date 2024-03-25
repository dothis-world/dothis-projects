import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RelWordsApiV1Modules } from '@Apps/modules/related-word/interfaces/http/queries/v1/rel-words-v1.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from '@Apps/config/cache/config/cache.config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService, 'DB_CONNECTION'],
      extraProviders: [
        {
          provide: 'DB_CONNECTION',
          useValue: 2,
        },
      ],
    }),
    RelWordsApiV1Modules,
    RouterModule.register([{ path: 'v1', module: RelWordsApiV1Modules }]),
  ],
})
export class RelatedWordsApiModule {}