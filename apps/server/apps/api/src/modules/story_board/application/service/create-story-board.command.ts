import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecentStoryBoardCreateDto } from '@Apps/modules/story_board/interfaces/dtos/story-board.dto';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/story-board.outbound';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { StoryBoardEntity } from '@Apps/modules/story_board/domain/entities/story-board.entity';
import { Ok, Result } from 'oxide.ts';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/story-board-details.di-token.constant';
import { StoryBoardDetailOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/story-board-details.outbound';

@CommandHandler(RecentStoryBoardCreateDto)
export class CreateStoryBoardCommand
  implements
    ICommandHandler<
      RecentStoryBoardCreateDto,
      Result<StoryBoardEntity, InternalServerErrorException>
    >
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: RecentStoryBoardOutboundPort,

    @Inject(STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT)
    private readonly storyBoardDetail: StoryBoardDetailOutboundPort,
  ) {}
  async execute(
    command: RecentStoryBoardCreateDto,
  ): Promise<Result<StoryBoardEntity, InternalServerErrorException>> {
    const storyBoardResult = await this.recentStoryBoard.create(command.id);
    const storyBoardId = storyBoardResult.id;
    await this.storyBoardDetail.create(storyBoardId);
    return Ok(storyBoardResult);
  }
}
