import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PutAgreePromotionDto } from '@Apps/modules/user/dtos/put-agree-promotion.dtos';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { Err, Ok } from 'oxide.ts';

@CommandHandler(PutAgreePromotionDto)
export class PutAgreePromotionCommandHandler
  implements ICommandHandler<PutAgreePromotionDto>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(command: PutAgreePromotionDto) {
    const res = await this.userRepository.updateOne({
      id: command.id.toString(),
      agreePromotion: command.isAgree,
    });
    if (!res.success) return Err(new InternalServerErrorException());
    return Ok(res.success);
  }
}
