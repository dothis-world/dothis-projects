import { Module } from '@nestjs/common';
import { AuthApiV1Module } from './commands/v1/AuthApi-v1.module';
import { RouterModule } from '@nestjs/core';
import { AuthApiV1QueriesModule } from '@Apps/common/auth/queries/AuthApi-v1.queries.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthApiV1Module,
    AuthApiV1QueriesModule,
    RouterModule.register([
      { path: 'v1', module: AuthApiV1Module },
      { path: 'v1', module: AuthApiV1QueriesModule },
    ]),
    // ClientsModule.registerAsync([
    //   {
    //     isGlobal: false,
    //     clients: [{}],
    //   },
    // ]),
  ],
})
export class AuthApiModule {}
