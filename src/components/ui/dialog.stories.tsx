import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from './button';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile details here. Click save when you are finished.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-slate-600">
          This is an example dialog body content where you would put forms or details.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const OpenByDefault: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>System Notification</DialogTitle>
          <DialogDescription>
            An automated database migration has been scheduled for tonight.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-lg">
          Please expect up to 5 minutes of intermittent service downtime.
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
};
