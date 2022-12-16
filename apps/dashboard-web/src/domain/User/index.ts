import { makeEndpoint } from '@zodios/core';
import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  videoCount: z.number(),
  subscriberCount: z.number(),
  averageViewCount: z.number(),
  profileImage: z.string(),
});

const getUser = makeEndpoint({
  method: 'get',
  path: '/users/:id',
  alias: 'getUser',
  description: 'Get a user',
  response: schema,
});
const getUsers = makeEndpoint({
  method: 'get',
  path: '/users',
  alias: 'getUsers',
  description: 'Get a users',
  response: z.array(schema),
});

export const api = [getUser, getUsers];
