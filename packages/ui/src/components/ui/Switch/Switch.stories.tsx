import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Switch from './index';

const meta = {
  title: 'ui/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchButton: Story = {
  args: {
    isDisabled: false,
  },
  argTypes: {
    isDisabled: { type: 'boolean' },
  },
};
