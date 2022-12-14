import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  name: z.string(),
});

export const api = apiBuilder({
  method: 'get',
  path: '/users',
  alias: 'getUsers',
  description: 'Get a users',
  response: z.array(schema),
})
  .addEndpoint({
    method: 'get',
    path: '/users/:id',
    alias: 'getUser',
    description: 'Get a user',
    response: schema,
  })
  .build();
