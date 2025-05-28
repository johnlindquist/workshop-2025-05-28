import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  const toggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders logo, navigation, search, and links', () => {
    render(<Header toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    expect(screen.getByAltText(/egghead.io logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Topics/i)).toBeInTheDocument();
    expect(screen.getByText(/Courses/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Enroll Today/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Header toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: Header component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs and calls toggleDarkMode when dark mode button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Header toggleDarkMode={toggleDarkMode} isDarkMode={false} />);
    const toggleBtn = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(toggleBtn);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: Header component rendered. Dark mode toggle clicked.');
    expect(toggleDarkMode).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
}); 