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
    buttonTheme: {
      option: ['primary', 'outlined', 'contained'],
      control: 'select',
    },
  },
  args: {
    label: '디폴트',
    size: 'M',
    buttonTheme: 'outlined',
  },
  // args 부분이 어떤 역할이지?? (default args 느낌인 것 같다.)
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '버튼',
    size: 'M',
    buttonTheme: 'outlined',
  },

  render: (args) => <Button {...args} />,
  // 다른요소나 태그까지 포함해서 rendering 하고싶을 때 render 사용.
};
