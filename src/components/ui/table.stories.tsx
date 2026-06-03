import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const customersSample = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', status: 'Active', plan: 'Enterprise' },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com', status: 'Suspended', plan: 'Pro' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Pending', plan: 'Basic' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of active operational customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Plan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customersSample.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>{c.email}</TableCell>
            <TableCell>{c.status}</TableCell>
            <TableCell className="text-right">{c.plan}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Entries</TableCell>
          <TableCell className="text-right font-bold">3</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
