import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Customer Operations</CardTitle>
        <CardDescription>Configure core portal parameters for accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600">
          This container manages general settings. You can modify billing and account tiers from the operational details view.
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Discard</Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <Card {...args} size="sm" className="w-[280px]">
      <CardHeader>
        <CardTitle>KPI Alert</CardTitle>
        <CardDescription>Billing discrepancies detected.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
          3 accounts are currently flagged for immediate payment reviews.
        </div>
      </CardContent>
    </Card>
  ),
};
