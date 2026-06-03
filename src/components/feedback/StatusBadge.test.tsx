import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  test('should render active status with correct label', () => {
    render(<StatusBadge status="active" />);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('text-emerald-700');
  });

  test('should render suspended status with correct label', () => {
    render(<StatusBadge status="suspended" />);
    const badge = screen.getByText('Suspended');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('text-rose-700');
  });

  test('should render pending status with correct label', () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('text-amber-700');
  });

  test('should render archived status with correct label', () => {
    render(<StatusBadge status="archived" />);
    const badge = screen.getByText('Archived');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('text-slate-600');
  });
});
