import { Module, Provider } from '@nestjs/common';
import { PostStoryBoardHttpV1Controller } from '@Apps/modules/story_board/controllers/v1/commands/post-story-board/post-story-board.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { StoryBoardAdapter } from '@Apps/modules/story_board/infrastructure/adapters/story-board.adapter';
import { CreateStoryBoardCommand } from '@Apps/modules/story_board/application/service/create-story-board.command';
import { StoryBoardEntityModule } from '@Apps/modules/story_board/domain/entities/story-board.entity.module';
import { PostStoryBoardTitleCommand } from '@Apps/modules/story_board/application/service/post-story-board-title.command';
import { PostStoryBoardDraftCommand } from '@Apps/modules/story_board/application/service/post-story-board-draft.command';
import { PostStoryBoardOverviewCommand } from '@Apps/modules/story_board/application/service/post-story-board-overview.command';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/story-board-details.di-token.constant';
import { StoryBoardOverviewAdapter } from '@Apps/modules/story_board/infrastructure/adapters/story-board-overview.adapter';
import { GetOneStoryBoardHttpV1Controller } from '@Apps/modules/story_board/controllers/v1/queries/get-one-story-board/get-one-story-board.http.controller';
import { GetOneStoryBoardQuery } from '@Apps/modules/story_board/application/service/get-one-story-board.query';
import { PostReferenceCommand } from '@Apps/modules/story_board/application/service/post-reference.command';
import { REFERENCE_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/reference.di-token.constant';
import { ReferenceAdapter } from '@Apps/modules/story_board/infrastructure/adapters/reference.adapter';
import { MemoAdapter } from '@Apps/modules/story_board/infrastructure/adapters/memo.adapter';
import { MEMO_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/memo.di-token.constant';
import { PostMemoCommand } from '@Apps/modules/story_board/application/service/post-memo.command';
import { GetManyStoryBoardHttpController } from '@Apps/modules/story_board/controllers/v1/queries/get-many-story-board/get-many-story-board.http.controller';
import { GetManyStoryBoardQuery } from '@Apps/modules/story_board/application/service/get-many-story-board.query';
const controllers = [
  PostStoryBoardHttpV1Controller,
  GetOneStoryBoardHttpV1Controller,
  GetManyStoryBoardHttpController,
];
const queries: Provider[] = [GetOneStoryBoardQuery, GetManyStoryBoardQuery];

const commands: Provider[] = [
  CreateStoryBoardCommand,
  PostStoryBoardTitleCommand,
  PostStoryBoardDraftCommand,
  PostStoryBoardOverviewCommand,
  PostReferenceCommand,
  PostMemoCommand,
];
const providers: Provider[] = [
  {
    provide: RECENT_STORY_BOARD_DI_TOKEN_CONSTANT,
    useClass: StoryBoardAdapter,
  },
  {
    provide: STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT,
    useClass: StoryBoardOverviewAdapter,
  },
  {
    provide: REFERENCE_DI_TOKEN_CONSTANT,
    useClass: ReferenceAdapter,
  },
  { provide: MEMO_DI_TOKEN_CONSTANT, useClass: MemoAdapter },
  ...queries,
  ...commands,
];
@Module({
  imports: [CqrsModule, StoryBoardEntityModule],
  controllers,
  providers,
})
export class StoryBoardV1Module {}
