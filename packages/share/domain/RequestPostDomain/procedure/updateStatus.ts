import { TRPCError } from '@trpc/server';
import { addDays } from 'date-fns';

import { RequestFundingDomain, UserDomain } from '@/domain';
import { schema } from '@/domain/RequestPostDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

export const updateStatusSchema = schema.pick({
  id: true,
  status: true,
  refusalReason: true,
  solvedUrl: true,
  creatorId: true,
});

export default t.procedure
  .input(updateStatusSchema)
  .mutation(async ({ input: { id, ...data } }) => {
    if (data.status === 'REFUSE') {
      const requestPost = await prisma.requestPost.findUnique({
        where: { id },
      });
      if (!requestPost) throw new TRPCError({ code: 'NOT_FOUND' });

      return prisma.requestPost.update({
        where: { id },
        data: {
          ...data,
          status: 'REQUEST',
          creatorId: null,
        },
      });
    }

    return prisma.requestPost.update({
      where: { id },
      data,
    });
  });
