import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LOG_LEVEL = 'info';
  });

  it('renders page numbers and navigation links', () => {
    render(<Pagination />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('logs INFO when rendered if log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Pagination />);
    expect(consoleSpy).toHaveBeenCalledWith('INFO: Pagination component rendered.');
    consoleSpy.mockRestore();
  });

  it('logs page number when a page is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Pagination />);
    const page2Link = screen.getByText('2');
    fireEvent.click(page2Link);
    expect(consoleSpy).toHaveBeenCalledWith("INFO: Pagination component rendered. Page '2' clicked.");
    consoleSpy.mockRestore();
  });

  it('logs navigation when Next is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    render(<Pagination />);
    const nextLink = screen.getByText('Next');
    fireEvent.click(nextLink);
    expect(consoleSpy).toHaveBeenCalledWith("INFO: Pagination component rendered. Page 'Next' clicked.");
    consoleSpy.mockRestore();
  });
}); 