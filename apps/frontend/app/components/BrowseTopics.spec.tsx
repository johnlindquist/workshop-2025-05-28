import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrowseTopics from './BrowseTopics';

describe('BrowseTopics', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders a grid of topics with images, names, and links', () => {
    render(<BrowseTopics />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(8);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(8);
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<BrowseTopics />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: BrowseTopics component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs topic name when a topic is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<BrowseTopics />);
    const reactLink = screen.getByText('React').closest('a');
    fireEvent.click(reactLink!);
    expect(consoleSpy).toHaveBeenCalledWith("INFO: BrowseTopics component rendered. Topic 'React' clicked.");
    consoleSpy.mockRestore();
  });
}); 