import { PartialApProps } from '@dothis/share/lib/utils';

import { RequestPostDomain } from '@/domain';

import type { TagTheme } from './index';
import Tag from './index';

type StatusKeys = keyof typeof RequestPostDomain.constants.requestStatusType;
const requestStatusToColor: Record<StatusKeys, TagTheme> = {
  REQUEST: 'red',
  COMPLETION: 'purple',
  REGISTRATION: 'green',
  ACCEPT: 'green',
  EXPIRATION: 'gray',
  REFUSE: 'gray',
};

const StatusTag = PartialApProps(Tag)(
  ({ requestStatus }: { requestStatus: StatusKeys }) => ({
    theme: requestStatusToColor[requestStatus],
    children: RequestPostDomain.constants.showStatusTypeKor.get(requestStatus),
  }),
);

export default StatusTag;
