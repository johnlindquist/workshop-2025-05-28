'use client';

import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import Pagination from './Pagination';
import { api, FeedItem, FeedResponse, getErrorMessage, loadingState } from '../utils/api';

const placeholderImg = (width: number, height: number, text = '', bgColor = 'cccccc', textColor = '969696') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Fallback data in case API fails
const fallbackFeedData: FeedItem[] = [
  {
    type: 'article',
    title: "AI Dev Essentials #7: Microsoft's AI Blitz, Google's NotebookLM Shines & New Coding Agents",
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(150, 150, 'AI'),
    href: '#',
    isLarge: true,
  },
  {
    type: 'lesson',
    title: 'Local AI Code Reviews with the CodeRabbit Extension in Cursor',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CR'),
    href: '#',
  },
  {
    type: 'lesson',
    title: 'Create a Simple GitHub Issue Search MCP Server using Cursor',
    author: 'Ákos Kőműves',
    authorImg: placeholderImg(32, 32, 'AK'),
    imgSrc: placeholderImg(85, 85, 'GH'),
    href: '#',
  },
  {
    type: 'article',
    title: 'AI Dev Essentials #6: Cursor 0.50, Zed, Cloudflare & AI Workflows',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'AI6'),
    href: '#',
  },
  {
    type: 'lesson',
    title: 'Automatically Improve Cursor Rules Using Custom Prompts',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CR'),
    href: '#',
  },
  {
    type: 'lesson',
    title: 'Clean up Legacy Functions for Testability in Cursor (0.50+) with cmd+k',
    author: 'John Lindquist',
    authorImg: placeholderImg(32, 32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CMD'),
    href: '#',
  },
];

const FeedSection: React.FC = () => {
  const [feedData, setFeedData] = useState<FeedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'created_at' | 'popular' | 'rating' | 'most_watched'>('created_at');
  const itemsPerPage = 6;

  const fetchFeedData = async (page: number, sort: typeof sortOrder) => {
    try {
      setIsLoading(true);
      loadingState.setLoading('feed', true);
      setError(null);
      
      const response = await api.getFeed({
        page,
        limit: itemsPerPage,
        sort,
      });
      
      setFeedData(response);
      
      if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
        console.info('INFO: FeedSection component rendered with API data.');
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Failed to fetch feed data:', err);
      
      // Fallback to hardcoded data if API fails
      const fallbackResponse: FeedResponse = {
        items: fallbackFeedData,
        pagination: {
          page,
          limit: itemsPerPage,
          total: fallbackFeedData.length,
          totalPages: Math.ceil(fallbackFeedData.length / itemsPerPage),
        },
      };
      setFeedData(fallbackResponse);
      
      if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
        console.info('INFO: FeedSection component rendered with fallback data due to API error.');
      }
    } finally {
      setIsLoading(false);
      loadingState.setLoading('feed', false);
    }
  };

  useEffect(() => {
    fetchFeedData(currentPage, sortOrder);
  }, [currentPage, sortOrder]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as typeof sortOrder;
    setSortOrder(newSort);
    setCurrentPage(1); // Reset to first page when sorting changes
    
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      console.info(`INFO: FeedSection component rendered. Sort order changed to '${newSort}'.`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      console.info(`INFO: FeedSection component rendered. Page changed to ${page}.`);
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-3 p-3">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse"
        >
          <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="dark:bg-gray-900 bg-gray-100 relative">
      <div className="max-w-screen-xl mx-auto w-full">
        <div>
          <div className="flex flex-col relative gap-3">
            <main className="flex flex-col col-span-full w-full relative dark:bg-gray-900 bg-gray-100">
              <div className="flex sm:items-end items-center justify-between">
                <h2 className="sm:px-5 px-3 sm:mt-4 lg:text-2xl sm:text-xl text-lg dark:text-white font-semibold leading-tight">
                  The Feed
                </h2>
                <select 
                  className="border-0 flex items-center flex-shrink-0 space-x-2 flex-nowrap dark:bg-gray-900 h-full bg-gray-100 text-sm p-2 rounded mr-2"
                  value={sortOrder}
                  onChange={handleSortChange}
                  disabled={isLoading}
                >
                  <option value="created_at">Recently Added</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="most_watched">Most Watched</option>
                </select>
              </div>
              
              {error && (
                <div className="mx-3 mb-3 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm">
                  Note: Using fallback data due to API connection issue: {error}
                </div>
              )}
              
              {isLoading ? (
                renderLoadingSkeleton()
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-3 p-3">
                  {feedData?.items.map((item, index) => (
                    <FeedCard key={`${item.title}-${index}`} item={item} />
                  ))}
                </div>
              )}
              
              {feedData && feedData.pagination.totalPages > 1 && (
                <Pagination 
                  currentPage={feedData.pagination.page}
                  totalPages={feedData.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSection; 