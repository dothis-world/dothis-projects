import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { Context } from './createContext';

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    };
  },
  allowOutsideOfServer: true,
});
