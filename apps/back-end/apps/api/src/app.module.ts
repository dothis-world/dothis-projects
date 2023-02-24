import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { AuthApiModule } from '@Apps/api/src/modules/auth/AuthApi.module';
import { ChannelApiModule } from './modules/channel/channel-api.module';
import { UserChannelDataApiModule } from '@Apps/api/src/modules/user-channel-data/user-channel-data-api.module';
import { validationSchema } from '@Apps/api/src/config/database/config/validationsSchema';
import dbConfig from '@Apps/api/src/config/database/config/db.env';
import { TypeormModule } from '@Apps/api/src/config/database/database.module';
import { HeathApiController } from '@Apps/api/src/health.controller';
import { HealthService } from '@Apps/api/src/health.service';

@Module({
  controllers: [HeathApiController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'development.env',
      // process.env.NODE_ENV === 'development'
      //   ? 'development.env'
      //   : 'production.env',
      load: [dbConfig],
      validationSchema,
    }),
    TypeormModule,
    //module
    UserApiModule,
    ChannelApiModule,
    AuthApiModule,
    UserChannelDataApiModule,
  ],
  providers: [HealthService],
})
export class AppModule {}
