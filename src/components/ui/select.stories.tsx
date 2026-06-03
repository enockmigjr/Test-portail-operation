import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div className="w-[180px]">
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Account Status</SelectLabel>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const PlanSelection: Story = {
  render: () => (
    <div className="w-[200px]">
      <Select defaultValue="pro">
        <SelectTrigger>
          <SelectValue placeholder="Select subscription" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Available Plans</SelectLabel>
            <SelectItem value="basic">Basic Plan</SelectItem>
            <SelectItem value="pro">Pro Plan</SelectItem>
            <SelectSeparator />
            <SelectItem value="enterprise">Enterprise Plan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};
