import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      defaultValue: '버튼',
      description: '버튼에 들어갈 텍스트',
      control: {
        type: 'text',
      },
    },
    disabled: { control: 'boolean' },
    size: {
      option: ['S', 'M', 'L'],
      control: 'radio',
    },
    theme: {
      option: ['primary', 'outlined', 'contained'],
      control: 'select',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '버튼',
    size: 'S',
    theme: 'primary',
  },

  render: (args) => <Button {...args} />,
};

export const OutLine: Story = {
  args: {
    label: '버튼',
    size: 'M',
    theme: 'outlined',
  },

  render: (args) => <Button {...args} />,
};

export const Contain: Story = {
  args: {
    label: '버튼',
    size: 'L',
    theme: 'contained',
  },

  render: (args) => <Button {...args} />,
};
