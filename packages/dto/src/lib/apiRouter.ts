import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relatedWordsApi } from './rel-words';
import { hitsApi } from './hits';
import { videoApi } from './video';
import { channelHistoryApi, expectedViewsApi } from './channel-history';
import { channelApi } from './channel';
import { storyBoardApi } from './story-board';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  hits: hitsApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  expectViews: expectedViewsApi,
  relatedWords: relatedWordsApi,
  video: videoApi,
  storyBoard: storyBoardApi,
});
