import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: 'No Active Support Tickets',
    description: 'This customer has no active support tickets associated with their account at the moment.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No matching customer found',
    description: 'No accounts correspond to the selected filters and search query.',
    actionLabel: 'Reset Directory Filters',
    onAction: () => alert('Filters reset!'),
  },
};
