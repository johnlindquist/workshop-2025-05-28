/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { Topic } from './types/topic';
import { FeedItem, FeedResponse } from './types/feed';
import { search } from './utils/search';
import { logger } from './utils/logger';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

// Request logging middleware (first to capture all requests)
app.use(requestLogger);

// CORS middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Helper function for placeholder images
const placeholderImg = (width: number, height: number, text = '', bgColor = 'cccccc', textColor = '969696') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Topics data (matching frontend hardcoded data)
const topicsData: Topic[] = [
  { name: 'React', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=R' },
  { name: 'Next.js', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=N' },
  { name: 'TypeScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=TS' },
  { name: 'JavaScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=JS' },
  { name: 'Remix', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rx' },
  { name: 'Redux', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rd' },
  { name: 'Supabase', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=S' },
  { name: 'Angular', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=A' },
];

// Feed data (matching frontend hardcoded data with additional metadata)
const feedData: FeedItem[] = [
  {
    type: 'article',
    title: "AI Dev Essentials #7: Microsoft's AI Blitz, Google's NotebookLM Shines & New Coding Agents",
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(150, 150, 'AI'),
    href: '#',
    isLarge: true,
    created_at: '2025-05-28T10:00:00Z',
    popularity: 95,
    rating: 4.8,
    watch_count: 1250,
  },
  {
    type: 'lesson',
    title: 'Local AI Code Reviews with the CodeRabbit Extension in Cursor',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CR'),
    href: '#',
    created_at: '2025-05-27T14:30:00Z',
    popularity: 87,
    rating: 4.6,
    watch_count: 980,
  },
  {
    type: 'lesson',
    title: 'Create a Simple GitHub Issue Search MCP Server using Cursor',
    author: 'Ákos Kőműves',
    authorImg: placeholderImg(32, 32, 'AK'),
    imgSrc: placeholderImg(85, 85, 'GH'),
    href: '#',
    created_at: '2025-05-26T09:15:00Z',
    popularity: 78,
    rating: 4.5,
    watch_count: 756,
  },
  {
    type: 'article',
    title: 'AI Dev Essentials #6: Cursor 0.50, Zed, Cloudflare & AI Workflows',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'AI6'),
    href: '#',
    created_at: '2025-05-25T16:45:00Z',
    popularity: 92,
    rating: 4.7,
    watch_count: 1100,
  },
  {
    type: 'lesson',
    title: 'Automatically Improve Cursor Rules Using Custom Prompts',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CR'),
    href: '#',
    created_at: '2025-05-24T11:20:00Z',
    popularity: 83,
    rating: 4.4,
    watch_count: 890,
  },
  {
    type: 'lesson',
    title: 'Clean up Legacy Functions for Testability in Cursor (0.50+) with cmd+k',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CMD'),
    href: '#',
    created_at: '2025-05-23T13:10:00Z',
    popularity: 75,
    rating: 4.3,
    watch_count: 654,
  },
];

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

// Topics API endpoint
app.get('/api/topics', (req, res) => {
  logger.info(`Topics API endpoint called, returning ${topicsData.length} topics`);
  res.json(topicsData);
});

// Feed API endpoint with pagination and sorting
app.get('/api/feed', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 6;
  const sort = req.query.sort as string || 'created_at';

  // Sort the data based on the sort parameter
  let sortedData = [...feedData];
  switch (sort) {
    case 'popular':
      sortedData.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'rating':
      sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'most_watched':
      sortedData.sort((a, b) => (b.watch_count || 0) - (a.watch_count || 0));
      break;
    case 'created_at':
    default:
      sortedData.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
      break;
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / limit);

  const response: FeedResponse = {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: sortedData.length,
      totalPages,
    },
  };

  logger.info(`Feed API endpoint called with page=${page}, limit=${limit}, sort=${sort}, returning ${paginatedItems.length} items`);
  res.json(response);
});

// Search API endpoint with query filtering
app.get('/api/search', (req, res) => {
  const query = req.query.q as string;

  // Request validation middleware - ensure query parameter is provided and not empty
  if (!query || query.trim() === '') {
    logger.warn('Search API endpoint called without query parameter');
    return res.status(400).json({
      error: 'Query parameter "q" is required and cannot be empty',
      message: 'Please provide a search query using the "q" parameter'
    });
  }

  // Perform search
  const results = search(query.trim(), topicsData, feedData);

  logger.info(`Search API endpoint called with query=${query}, found ${results.length} results`);
  res.json(results);
});

// 404 handler for unmatched routes (must be after all route definitions)
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
