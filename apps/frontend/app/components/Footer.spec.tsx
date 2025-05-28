import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  const toggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders all links and the dark mode toggle', () => {
    render(<Footer toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    expect(screen.getByAltText(/egghead.io logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Expert led courses/i)).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('©egghead.io')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Footer toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: Footer component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs and calls toggleDarkMode when dark mode button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Footer toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    const toggleBtn = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(toggleBtn);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: Footer component rendered. Dark mode toggle clicked.');
    expect(toggleDarkMode).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
}); 