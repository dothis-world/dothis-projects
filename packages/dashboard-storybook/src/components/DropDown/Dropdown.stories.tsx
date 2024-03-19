import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';
import DropdownHeader from './DropdownHeader';
import React, { useState } from 'react';
import DropdownItem from './DropdownItem';
import clsx from 'clsx';

const meta = {
  title: 'components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: {
      defaultValue: '라벨',
      description: '드롭다운 라벨을 명시합니다.',
      control: { type: 'text' },
    },
  },
  args: {
    label: '드롭다운',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

export type Story = StoryObj<typeof meta>;

// React.Fragment 때문에, Item 클릭시 안 닫힙니다
export const DropdownStory: Story = {
  args: {
    children: (
      <React.Fragment>
        <DropdownHeader label="HEADER"></DropdownHeader>
        <DropdownItem>hihi</DropdownItem>
        <DropdownItem>byebye</DropdownItem>
        <DropdownItem>안녕</DropdownItem>
      </React.Fragment>
    ),
    label: '드롭다운',
  },
};

export const NestedDropdown = (args: { [x: string]: any }) => {
  return (
    <Dropdown label="드롭다운" {...args}>
      <DropdownHeader label="Notifications"></DropdownHeader>
      <DropdownItem>hihi</DropdownItem>
      <Dropdown label="드롭다운">
        <DropdownItem>111</DropdownItem>
        <DropdownItem>2</DropdownItem>
        <DropdownItem>3</DropdownItem>
        <Dropdown label="드롭다운">
          <DropdownItem>111</DropdownItem>
          <DropdownItem>2</DropdownItem>
          <DropdownItem>3</DropdownItem>
        </Dropdown>
      </Dropdown>
      <DropdownItem>byebye</DropdownItem>
      <DropdownItem>안녕</DropdownItem>
    </Dropdown>
  );
};

export const DropdownTabView = (args: { [x: string]: any }) => {
  return (
    <Dropdown label="드롭다운" {...args}>
      <div>
        <TabView>
          <Tab tabKey="탭1">
            <DropdownItem>드롭다운 1닫기</DropdownItem>
            <div>탭111</div>
            <div>탭111</div>
            <Dropdown label="드롭다운2">
              <DropdownHeader label="Notifications"></DropdownHeader>
              <DropdownItem>드롭다운 1닫기</DropdownItem>
              <DropdownItem
                onClose={() => {
                  console.log('hihi');
                }}
              >
                드롭다운 2닫기
              </DropdownItem>
              <div>안닫힘</div>
            </Dropdown>
            <div>탭111</div>
          </Tab>
          <Tab tabKey="탭2">
            <div>탭222</div>
            <div>탭222</div>
            <div>탭222</div>
          </Tab>
        </TabView>
      </div>
    </Dropdown>
  );
};

// 임시로 배껴온 TabView

interface TabProps {
  tabKey: string;
  children: React.ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <div className="">{children}</div>;
};

interface TabViewProps {
  children: React.ReactNode;
}

const TabView = ({ children }: TabViewProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div className="flex flex-col">
      <div className="border-grey400 flex flex-row gap-[20px] border-b-2 px-5 pb-2">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <button
                className={clsx(
                  'translate-y-[9.5px] transition duration-500 ease-in-out',
                  index === activeTabIndex
                    ? 'font-bold border-primary500 border-b-2 text-black'
                    : 'text-grey400',
                )}
                key={index}
                onClick={() => setActiveTabIndex(index)}
              >
                {child.props.tabKey}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div>
        {React.Children.map(children, (child, index) => {
          return (
            <div
              className={clsx(index !== activeTabIndex && 'hidden')}
              key={index}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
