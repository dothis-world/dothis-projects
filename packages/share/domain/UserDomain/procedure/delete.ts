import { z } from 'zod';

import { prisma } from '../../../prisma/client';
import { t } from '../../../server/trpc';
import { schema } from '../domain';

export default t.procedure
  .input(
    z.object({
      id: schema.shape.id,
    }),
  )
  .mutation(({ input: { id }, ctx }) =>
    prisma.user.delete({
      where: {
        id,
      },
    }),
  );
