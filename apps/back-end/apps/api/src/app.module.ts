import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@Apps/api/src/health/health.module';
import { UserApiModule } from '@Apps/api/src/user/UserApi.module';
import { TypeOrmExModule } from '@Libs/commons/typeorm/type-orm-ext.module';
import { createDatabaseConnection } from '@Libs/entity/src/config/database.mysql';
import { UserQueryRepository } from '@Libs/entity/src/domain/user/UserQueryRepository';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    UserApiModule,
    createDatabaseConnection(),
    TypeOrmExModule.forCustomRepository([UserQueryRepository]),
  ],
})
export class AppModule {}
