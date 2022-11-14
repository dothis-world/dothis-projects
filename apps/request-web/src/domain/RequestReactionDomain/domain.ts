import { strictlyOnlyRecordKey } from '@dothis/share/lib/utils';
import { ReactionType } from '@prisma/client';
import { z } from 'zod';

import { schema as requestPostSchema } from '../RequestPostDomain/domain';
import { schema as userSchema } from '../UserDomain/domain';

export const schema = z.object({
  requestId: requestPostSchema.shape.id,
  userId: userSchema.shape.id.optional(),
  type: z.nativeEnum(ReactionType),
  createdAt: z.date(),
});

export const constants = {
  reactionTypeKor: strictlyOnlyRecordKey<ReactionType>()({
    LIKE: '좋아요',
    DISLIKE: '싫어요',
  }),
};
