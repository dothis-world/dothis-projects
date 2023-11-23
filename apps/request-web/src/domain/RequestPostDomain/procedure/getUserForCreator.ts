import { z } from 'zod';

import { t } from '@/server/trpc';

import * as UserDomain from '../../UserDomain';
import { db } from '../db';

// 특정 크리에이터한테 요청한 유저의 아이템을 가져옴
export default t.procedure
  .input(
    z.object({
      userId: UserDomain.schema.shape.id.nullish(),
      creatorUserId: UserDomain.schema.shape.id,
    }),
  )
  .query(({ input: { userId, creatorUserId } }) => {
    if (!userId) return null;
    return db.getItems({
      take: 3,
      where: {
        creator: {
          userId: creatorUserId,
        },
        user: {
          id: userId,
        },
      },
    });
  });
