import { apiUser } from '@dothis/share/lib/dto';
import { c } from '@dothis/share/lib/dto/contract';
// import { c } from '@dothis/share/lib/dto/contract';
import { initClient, initContract } from '@ts-rest/core';
import type { InitClientReturn } from '@ts-rest/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import { apiBaseUrl } from '@/constants/dev';
import * as User from '@/domain/User';

// export const apiClient = new Zodios(
//   apiBaseUrl,
//   // API definition
//   [...User.api],
// );
// export const apiHooks = new ZodiosHooks('myAPI', apiClient);

const contract = c.router({
  user: apiUser,
});

export const apiClient: InitClientReturn<typeof contract> = initQueryClient(
  contract,
  {
    baseUrl: apiBaseUrl,
    baseHeaders: {},
  },
);
