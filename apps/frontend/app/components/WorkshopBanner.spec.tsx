import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkshopBanner from './WorkshopBanner';

// Mock process.env for log level
beforeAll(() => {
  process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
});

describe('WorkshopBanner', () => {
  it('renders the banner with correct text and link', () => {
    render(<WorkshopBanner />);
    expect(screen.getByText(/Early Bird Discount Available/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Cursor Workshop with John Lindquist/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Claim your Spot/i })).toBeInTheDocument();
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<WorkshopBanner />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: WorkshopBanner component rendered.');
    consoleSpy.mockRestore();
  });

  it('can be dismissed', () => {
    render(<WorkshopBanner />);
    const dismissBtn = screen.getByRole('button', { name: /dismiss banner/i });
    fireEvent.click(dismissBtn);
    expect(screen.queryByText(/Early Bird Discount Available/i)).not.toBeInTheDocument();
  });

  it('link is clickable', () => {
    render(<WorkshopBanner />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
  });
}); 