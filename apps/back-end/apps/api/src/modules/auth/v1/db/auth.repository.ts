import { AuthRepositoryPort } from '@Apps/api/src/modules/auth/v1/db/auth.repository.port';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@Apps/api/src/modules/user/v1/db/user.repository';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
