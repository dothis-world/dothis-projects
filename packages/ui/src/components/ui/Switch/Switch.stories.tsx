import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Switch from './index';

const meta = {
  title: 'ui/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isDisabled: false,
    ischecked: false,
  },
  argTypes: {
    isDisabled: { type: 'boolean' },
    ischecked: { type: 'boolean' },
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    ischecked: false,
  },
  argTypes: {
    isDisabled: { type: 'boolean' },
    ischecked: { type: 'boolean' },
  },
};
