import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import userEvent from '@testing-library/user-event';

describe('EmptyState Component', () => {
  test('should render default title and description', () => {
    render(<EmptyState />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search terms or filters to find what you are looking for.')).toBeInTheDocument();
  });

  test('should render custom title and description', () => {
    render(<EmptyState title="No accounts" description="Zero accounts in directory" />);
    expect(screen.getByText('No accounts')).toBeInTheDocument();
    expect(screen.getByText('Zero accounts in directory')).toBeInTheDocument();
  });

  test('should render action button and call callback', async () => {
    const handleAction = vi.fn();
    render(<EmptyState actionLabel="Clear Search" onAction={handleAction} />);
    
    const actionBtn = screen.getByRole('button', { name: /clear search/i });
    expect(actionBtn).toBeInTheDocument();

    await userEvent.click(actionBtn);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
