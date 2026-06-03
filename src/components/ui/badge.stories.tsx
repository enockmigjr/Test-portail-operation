import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Active account',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Optional log',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Suspended account',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Operation name',
    variant: 'outline',
  },
};
