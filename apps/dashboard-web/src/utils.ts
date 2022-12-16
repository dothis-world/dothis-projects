import { flow2 } from '@dothis/share';
import { getPathMatch } from 'next/dist/shared/lib/router/utils/path-match';

getPathMatch('/api/payItem/:id/:user')('/api/payItem/1243/aa'); /*?*/

flow2(getPathMatch); /*?*/

// const ff = flip(getPathMatch);
// ff('/api/payItem/1243/aa')('/api/payItem/:id/:user'); /*?*/
