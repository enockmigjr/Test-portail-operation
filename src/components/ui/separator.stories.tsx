import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-[300px] space-y-2">
      <div className="text-sm font-semibold text-slate-800">Operational Log</div>
      <Separator {...args} />
      <div className="text-xs text-slate-500">Last updated: 2 minutes ago.</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm font-semibold text-slate-800">
      <div>Dashboard</div>
      <Separator {...args} orientation="vertical" />
      <div>Customers</div>
      <Separator {...args} orientation="vertical" />
      <div>Settings</div>
    </div>
  ),
};
