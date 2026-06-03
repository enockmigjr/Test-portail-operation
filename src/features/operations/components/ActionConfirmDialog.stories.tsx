import type { Meta, StoryObj } from '@storybook/react';
import { ActionConfirmDialog } from './ActionConfirmDialog';

const meta: Meta<typeof ActionConfirmDialog> = {
  title: 'Operations/ActionConfirmDialog',
  component: ActionConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'select',
      options: ['activate', 'suspend', 'reopen', 'archive'],
    },
    isOpen: {
      control: 'boolean',
    },
    isPending: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionConfirmDialog>;

export const Suspend: Story = {
  args: {
    action: 'suspend',
    isOpen: true,
    onClose: () => {},
    onConfirm: (reason) => console.log('Confirm action with reason:', reason),
    isPending: false,
  },
};

export const Activate: Story = {
  args: {
    action: 'activate',
    isOpen: true,
    onClose: () => {},
    onConfirm: (reason) => console.log('Confirm action with reason:', reason),
    isPending: false,
  },
};

export const Archive: Story = {
  args: {
    action: 'archive',
    isOpen: true,
    onClose: () => {},
    onConfirm: (reason) => console.log('Confirm action with reason:', reason),
    isPending: false,
  },
};

export const Reopen: Story = {
  args: {
    action: 'reopen',
    isOpen: true,
    onClose: () => {},
    onConfirm: (reason) => console.log('Confirm action with reason:', reason),
    isPending: false,
  },
};

export const Pending: Story = {
  args: {
    action: 'suspend',
    isOpen: true,
    onClose: () => {},
    onConfirm: (reason) => console.log('Confirm action with reason:', reason),
    isPending: true,
  },
};
