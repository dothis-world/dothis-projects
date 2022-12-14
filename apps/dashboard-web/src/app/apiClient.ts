import { Zodios } from '@zodios/core';

import { apiBaseUrl } from '@/constants/dev';
import * as User from '@/domain/User';

export const apiClient = new Zodios(
  apiBaseUrl,
  // API definition
  [...User.api],
);
