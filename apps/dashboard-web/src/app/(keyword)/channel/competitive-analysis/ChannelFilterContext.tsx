import { createContext, useContext, useState } from 'react';

import { clustersCategoriesOptions } from '@/constants/clusterCategories';
import type { SubscriberRangeValue } from '@/constants/subscribersRange';
import { subscribersRangeOptions } from '@/constants/subscribersRange';

type ClusterCategory = (typeof clustersCategoriesOptions)[0];

interface SubscriberRange {
  value: SubscriberRangeValue;
  label: string;
}

interface ChannelFilterState {
  channelCategory: ClusterCategory | typeof initialOption;
  setChannelCategory: React.Dispatch<
    React.SetStateAction<ClusterCategory | typeof initialOption>
  >;
  clustersCategoriesOptions: (ClusterCategory | typeof initialOption)[];

  subscriberRange: SubscriberRange | typeof initialOption;
  setSubscriberRange: React.Dispatch<
    React.SetStateAction<SubscriberRange | typeof initialOption>
  >;
  subscribersRangeOptions: (
    | (typeof subscribersRangeOptions)[number]
    | typeof initialOption
  )[];
}

const initialOption = { label: '전체', value: undefined };

const ChannelFilterContext = createContext<ChannelFilterState | null>(null);

export const useChannelFilterContext = (componentName: string) => {
  const context = useContext(ChannelFilterContext);

  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <ChannelFilterContextProvider>가 존재하지 않습니다.`,
    );
  }
  return context;
};

const ChannelFilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [channelCategory, setChannelCategory] = useState<
    ClusterCategory | typeof initialOption
  >(initialOption); //

  const [subscriberRange, setSubscriberRange] = useState<
    SubscriberRange | typeof initialOption
  >(initialOption); //

  const sortedChannelCategory = clustersCategoriesOptions.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const combinedChannelCategory = [initialOption, ...sortedChannelCategory];

  const combinedSubscriberRange = [initialOption, ...subscribersRangeOptions];

  return (
    <ChannelFilterContext.Provider
      value={{
        channelCategory,
        setChannelCategory,
        clustersCategoriesOptions: combinedChannelCategory,
        subscriberRange,
        setSubscriberRange,
        subscribersRangeOptions: combinedSubscriberRange,
      }}
    >
      {children}
    </ChannelFilterContext.Provider>
  );
};

export default ChannelFilterContextProvider;
