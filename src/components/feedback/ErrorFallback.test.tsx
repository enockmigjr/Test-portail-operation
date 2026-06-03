import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorFallback } from './ErrorFallback';
import userEvent from '@testing-library/user-event';

describe('ErrorFallback Component', () => {
  test('should render default title and message', () => {
    render(<ErrorFallback />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByText('We encountered an error while loading this data. Please try again.')).toBeInTheDocument();
  });

  test('should render custom title and message', () => {
    render(<ErrorFallback title="Fail to fetch" message="Server offline" />);
    expect(screen.getByText('Fail to fetch')).toBeInTheDocument();
    expect(screen.getByText('Server offline')).toBeInTheDocument();
  });

  test('should render retry button when onRetry is provided', async () => {
    const handleRetry = vi.fn();
    render(<ErrorFallback onRetry={handleRetry} />);
    
    const retryBtn = screen.getByRole('button', { name: /retry request/i });
    expect(retryBtn).toBeInTheDocument();

    await userEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('should not render retry button if onRetry is undefined', () => {
    render(<ErrorFallback />);
    expect(screen.queryByRole('button', { name: /retry request/i })).toBeNull();
  });
});
