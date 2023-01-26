import { getRouteResponses, initContract } from '@ts-rest/core';

import { apiUser } from './user/user.model';

export const c = initContract();

export const contract = c.router({
  user: apiUser,
});

const contractResponses = getRouteResponses(contract);
export type ResponseShapes = typeof contractResponses;
