import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedSection from './FeedSection';

describe('FeedSection', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders multiple feed cards and sort dropdown', () => {
    render(<FeedSection />);
    expect(screen.getByText('The Feed')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Recently Added')).toBeInTheDocument();
    expect(screen.getByText(/AI Dev Essentials #7/i)).toBeInTheDocument();
    expect(screen.getByText(/Local AI Code Reviews/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(6);
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<FeedSection />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: FeedSection component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs sort order change when dropdown is changed', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<FeedSection />);
    const sortSelect = screen.getByDisplayValue('Recently Added');
    fireEvent.change(sortSelect, { target: { value: 'popular' } });
    expect(consoleSpy).toHaveBeenCalledWith("INFO: FeedSection component rendered. Sort order changed to 'popular'.");
    consoleSpy.mockRestore();
  });
}); 