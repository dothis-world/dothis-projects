'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import dayjs from 'dayjs';

import SvgComp from '@/components/common/SvgComp';

import { useVideoFilterContext } from './VideoFilterContext';

const SearchFilterDropdown = () => {
  const {
    videoSortOption,
    setVideoSortOption,
    SORT_FILTER,
    datePeriodFilter,
    setDatePeriodFilter,
    DATE_PERIOD_FILTER,
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
                onClick={() => setVideoSortOption({ label, value })}
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
