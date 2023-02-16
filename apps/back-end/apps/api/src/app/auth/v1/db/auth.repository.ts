import { AuthRepositoryPort } from '@Apps/api/src/app/auth/v1/db/auth.repository.port';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@Apps/api/src/app/user/v1/db/user.repository';

@Injectable()
export class AuthRepository
  extends UserRepository
  implements AuthRepositoryPort {}
