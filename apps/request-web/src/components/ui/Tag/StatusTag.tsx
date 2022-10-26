import type { TagTheme } from '@/components/ui/Tag/index';
import Tag from '@/components/ui/Tag/index';
import RequestPostDomain from '@/domain/RequestPostDomain';
import { PartialApProps } from '@/utils/common';

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
