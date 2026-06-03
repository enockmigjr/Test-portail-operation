import type { Meta, StoryObj } from '@storybook/react';
import { ErrorFallback } from './ErrorFallback';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Feedback/ErrorFallback',
  component: ErrorFallback,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    title: 'Database connection failed',
    message: 'Could not connect to the remote PostgreSQL node. Please verify your VPN credentials.',
  },
};

export const WithRetryButton: Story = {
  args: {
    title: 'Failed to load details',
    message: 'We were unable to load the customer logs at this time.',
    onRetry: () => alert('Retrying to fetch data...'),
  },
};
