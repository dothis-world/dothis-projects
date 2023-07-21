import { Module, Provider } from '@nestjs/common';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { GoogleStrategy, AtStrategy } from '@Libs/commons/src/oauth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { GoogleLoginHttpController } from '@Apps/common/auth/v1/commands/google-login/goolgle-login.http.controller';
import { GoogleLoginRedirectHttpController } from '@Apps/common/auth/v1/commands/google-login-redirect/google-login-redirect.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { GoogleLoginRedirectCommandHandler } from '@Apps/common/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { VerifyTokenHttpController } from '@Apps/common/auth/v1/commands/verify-token/verify-token.http.controller';
import { VerifyTokenCommandHandler } from '@Apps/common/auth/v1/commands/verify-token/verify-token.service';

const httpControllers = [
  GoogleLoginHttpController,
  GoogleLoginRedirectHttpController,
  VerifyTokenHttpController,
];

const strategies: Provider[] = [GoogleStrategy, AtStrategy];

const commandHandlers: Provider[] = [
  GoogleLoginRedirectCommandHandler,
  VerifyTokenCommandHandler,
];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
@Module({
  controllers: [...httpControllers],
  imports: [
    CqrsModule,
    UserEntityModule,
    // ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [...strategies, ...repositories, ...commandHandlers],
})
export class AuthApiV1Module {}
