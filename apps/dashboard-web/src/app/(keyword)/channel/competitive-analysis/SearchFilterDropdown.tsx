'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import dayjs from 'dayjs';

import SvgComp from '@/components/common/SvgComp';

import { useVideoFilterContext } from './VideoFilterContext';

const SORT_FILTER = [
  {
    label: '최신순',
    value: {
      order: 'desc',
      sort: 'video_published',
    },
  },
  {
    label: '오래된 순',
    value: {
      order: 'asc',
      sort: 'video_published',
    },
  },
  {
    label: '조회수 순',
    value: {
      order: 'desc',
      sort: 'video_views',
    },
  },
];

const dayjsFormat = 'YYYY-MM-DD';
const DATE_PERIOD_FILTER = [
  {
    label: '최근7일',
    value: dayjs().subtract(1, 'week').format(dayjsFormat),
  },
  {
    label: '최근30일',
    value: dayjs().subtract(1, 'month').format(dayjsFormat),
  },
  {
    label: '최근90일',
    value: dayjs().subtract(3, 'month').format(dayjsFormat),
  },
  {
    label: '최근1년',
    value: dayjs().subtract(1, 'year').format(dayjsFormat),
  },
];

const SearchFilterDropdown = () => {
  const {
    videoSortOption,
    setVideoSortOption,

    datePeriodFilter,
    setDatePeriodFilter,
  } = useVideoFilterContext('SearchFilterDropdown');

  return (
    <div className=" flex">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-s-10 group flex cursor-pointer items-center gap-[10px] border px-[20px] py-[16px]">
            {/* Step 2: Add peer class to the <p> tag */}
            <p className="text-grey500 text-[14px] font-[500]">
              {videoSortOption?.label}
            </p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {SORT_FILTER.map(({ label, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={
                  value.sort === videoSortOption.value.sort &&
                  value.order === videoSortOption.value.order
                }
                key={label + value}
                onClick={() => setDatePeriodFilter({ label, value })}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {label}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>{' '}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-e-10 group  flex items-center gap-[10px] border px-[20px] py-[16px]">
            <p className="text-grey500 text-[14px] font-[500]">
              {datePeriodFilter?.label}
            </p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {DATE_PERIOD_FILTER.map(({ label, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={value === datePeriodFilter.value}
                key={label}
                onClick={() => setDatePeriodFilter({ label, value })}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {label}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default SearchFilterDropdown;
