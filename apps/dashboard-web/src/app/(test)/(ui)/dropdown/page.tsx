'use client';

import Dropdown from '@/components/DropDown/Dropdown';
import DropdownItem from '@/components/DropDown/DropdownItem';
import { Input } from 'dashboard-storybook/src/components/Input/Input';
import DropdownSub from '@/components/DropDown/DropdownSub';

const Page = () => {
  return (
    <div>
      <p className="font-bold"> Dropdown 컴포넌트 테스트용 페이지</p>
      <div className="flex text-center px-20">
        <Dropdown
          trigger={
            <div>
              <div className="px-3 min-w-[44px] min-h-[20px]">열려라 참깨</div>
            </div>
          }
          className="bg-grey100"
        >
          <DropdownItem label="Default"></DropdownItem>
          <DropdownItem
            label="leftSlot/rightSlot"
            leftSlot="(왼쪽)"
            rightSlot="(오른쪽)"
          ></DropdownItem>
          <DropdownItem label="disabled" disabled></DropdownItem>
          <DropdownItem label="href 페이지 이동" href="/storyboard" />
          <DropdownItem label="preventAutoClose" preventAutoClose>
            <div>=== preventEvent flag</div>
            <Input></Input>
          </DropdownItem>
          <DropdownSub trigger={<div>More Tools</div>}>
            <DropdownItem label="Save Page As…" rightSlot="⌘+S"></DropdownItem>
            <DropdownItem label="Create Shortcut…"></DropdownItem>
            <DropdownItem label="Name Window…"></DropdownItem>
            <DropdownItem label="Name Window…"></DropdownItem>
            <DropdownItem label="Developer Tools"></DropdownItem>
            <DropdownItem label="..."></DropdownItem>
          </DropdownSub>
        </Dropdown>
      </div>
    </div>
  );
};

export default Page;
