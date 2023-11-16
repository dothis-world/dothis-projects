import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  zUserModel,
  zVideoHistory,
  zVideoModel,
  zTokenExpired,
  zRelWords,
} from '@dothis/dto';
import { zExpectedData, zIncreaseData } from '@Libs/commons/src/types/res.zod';

export class UserDto extends createZodDto(extendApi(zUserModel)) {}
export class UserRes extends UserDto {}
export class VideoHistoryRes extends createZodDto(extendApi(zVideoHistory)) {}

export class VideoRes extends createZodDto(extendApi(zVideoModel)) {}

export class RelwordsRes extends createZodDto(extendApi(zRelWords)) {}

export class TokenExpired extends createZodDto(extendApi(zTokenExpired)) {}

export class ExpectedViewsData extends createZodDto(extendApi(zExpectedData)) {}

export class IncreaseData extends createZodDto(extendApi(zIncreaseData)) {}
// export class CreateUserInput extends createZodDto(
//   // userModel.omit({
//   //   dateSignIn: true,
//   // }),
// ) {}

// export class UpdateUserInput extends createZodDto(
//   userModel.omit({
//     dateSignIn: true,
//   }),
// ) {}
