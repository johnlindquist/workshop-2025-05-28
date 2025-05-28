import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedCard from './FeedCard';

describe('FeedCard', () => {
  const mockItem = {
    type: 'lesson',
    title: 'Test Lesson Title',
    author: 'Test Author',
    authorImg: 'https://placehold.co/32x32/cccccc/969696?text=TA',
    imgSrc: 'https://placehold.co/85x85/cccccc/969696?text=Test',
    href: '#test',
  };

  const mockLargeItem = {
    ...mockItem,
    type: 'article',
    title: 'Test Article Title',
    isLarge: true,
    imgSrc: 'https://placehold.co/150x150/cccccc/969696?text=Test',
  };

  it('renders correctly for regular item', () => {
    render(<FeedCard item={mockItem} />);
    expect(screen.getByText('Test Lesson Title')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('lesson')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '#test');
  });

  it('renders correctly for large item', () => {
    render(<FeedCard item={mockLargeItem} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('article')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '#test');
  });

  it('displays author image with correct alt text', () => {
    render(<FeedCard item={mockItem} />);
    const authorImg = screen.getByAltText('Test Author');
    expect(authorImg).toBeInTheDocument();
    expect(authorImg).toHaveAttribute('src', mockItem.authorImg);
  });
}); 