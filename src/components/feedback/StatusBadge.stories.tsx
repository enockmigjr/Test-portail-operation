import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Feedback/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'suspended', 'pending', 'archived'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Suspended: Story = {
  args: {
    status: 'suspended',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Archived: Story = {
  args: {
    status: 'archived',
  },
};
