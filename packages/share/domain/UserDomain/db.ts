import type { Prisma } from '@/generated/prisma-client';
import { prisma } from '@/prisma/client';

export const db = {
  get(args: Omit<Prisma.UserFindUniqueArgs, 'include'>) {
    return prisma.user.findUnique({
      ...args,
      include: {
        creator: {
          include: {
            creatorAuths: true,
          },
        },
      },
    });
  },
};