import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/channel-data.di-token.constants';
import { Err, Ok, Result } from 'oxide.ts';

import { ChannelDataRepositoryPort } from '@Apps/modules/channel/domain/ports/channel-data.repository.port';
import { ResultChannelKeywordTag } from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export class FindKeywordTagByUserCommand {
  public readonly userId: string;
  public readonly channelId: string;
  constructor(props: FindKeywordTagByUserCommand) {
    this.userId = props.userId;
    this.channelId = props.channelId;
  }
}

@CommandHandler(FindKeywordTagByUserCommand)
export class GetUserV2CommandHandler
  implements
    ICommandHandler<
      FindKeywordTagByUserCommand,
      Result<ResultChannelKeywordTag, ChannelNotFoundError>
    >
{
  constructor(
    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPort,
  ) {}
  async execute(
    command: FindKeywordTagByUserCommand,
  ): Promise<Result<ResultChannelKeywordTag, ChannelNotFoundError>> {
    const res = await this.channelDataRepo.findOneByChannelId(
      command.channelId,
    );
    if (!res) return Err(new ChannelNotFoundError());
    const { keyword, tag } = res;
    return Ok({
      channelKeywords: keyword && keyword.split(','),
      channelTags: tag && tag.split(','),
    });
  }
}
