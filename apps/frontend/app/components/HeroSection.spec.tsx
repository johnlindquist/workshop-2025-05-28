import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders the headline and search input', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Bite-Sized Screencasts for Web Developers/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/React, TypeScript, AWS, CSS/i)).toBeInTheDocument();
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<HeroSection />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: HeroSection component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs on input focus and change', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<HeroSection />);
    const input = screen.getByPlaceholderText(/React, TypeScript, AWS, CSS/i);
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'React' } });
    expect(consoleSpy).toHaveBeenCalledWith('INFO: HeroSection component rendered. Search input focused/changed.');
    consoleSpy.mockRestore();
  });
}); 