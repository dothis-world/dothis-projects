import { Center } from '@chakra-ui/react';
import { useMatch } from '@dothis/ui/src/hooks';

import { trpc } from '@/utils/trpc';

import { SvgSearch } from '../Icons';
import type { MentionInputProps } from '../Input';
import { MentionInput } from '../Input';

export type SearchInputProps = Omit<MentionInputProps, 'match'>;
const SearchInput = (props: SearchInputProps) => {
  const creatorNames = trpc.creator.getAll.useQuery(undefined, {
    select: (data) => {
      let creatorNameArr: string[] = [];
      for (const creator of data) {
        if (creator.user.name) creatorNameArr.push(creator.user.name);
      }
      return creatorNameArr;
    },
  });

  const match = useMatch({
    getList(name) {
      return creatorNames.data ?? [];
    },
  });

  return (
    <MentionInput
      match={match}
      Right={
        <Center>
          <SvgSearch />
        </Center>
      }
      {...props}
    />
  );
};

export default SearchInput;
