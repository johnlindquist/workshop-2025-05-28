'use client';

import React, { useState, useEffect } from 'react';
import { api, Topic, getErrorMessage, loadingState } from '../utils/api';

const BrowseTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        loadingState.setLoading('topics', true);
        setError(null);
        
        const topicsData = await api.getTopics();
        setTopics(topicsData);
        
        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
          console.info('INFO: BrowseTopics component rendered with API data.');
        }
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        console.error('Failed to fetch topics:', err);
        
        // Fallback to hardcoded data if API fails
        const fallbackTopics: Topic[] = [
          { name: 'React', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=R' },
          { name: 'Next.js', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=N' },
          { name: 'TypeScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=TS' },
          { name: 'JavaScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=JS' },
          { name: 'Remix', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rx' },
          { name: 'Redux', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rd' },
          { name: 'Supabase', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=S' },
          { name: 'Angular', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=A' },
        ];
        setTopics(fallbackTopics);
        
        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
          console.info('INFO: BrowseTopics component rendered with fallback data due to API error.');
        }
      } finally {
        setIsLoading(false);
        loadingState.setLoading('topics', false);
      }
    };

    fetchTopics();
  }, []);

  const handleClick = (name: string) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      console.info(`INFO: BrowseTopics component rendered. Topic '${name}' clicked.`);
    }
  };

  if (isLoading) {
    return (
      <div className="sm:pt-16 px-3 pt-8 sm:pb-16 pb-8 max-w-screen-xl mx-auto">
        <h2 className="text-center sm:text-lg text-base dark:text-gray-200 text-gray-700 font-normal text-balance leading-tight pb-6">
          Browse Curated Developer Resources on the Best Tools
        </h2>
        <div className="grid lg:grid-cols-8 rounded-lg lg:overflow-visible overflow-hidden divide-x lg:divide-y-0 divide-y dark:divide-gray-900 divide-gray-100 sm:grid-cols-4 grid-cols-2 bg-white dark:bg-gray-800">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:aspect-square lg:first-of-type:rounded-l-lg lg:last-of-type:rounded-r-lg items-center justify-center p-5 bg-transparent dark:bg-gray-800 animate-pulse"
            >
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mt-3"></div>
            </div>
          ))}
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm">
            Failed to load topics: {error}. Showing fallback data.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="sm:pt-16 px-3 pt-8 sm:pb-16 pb-8 max-w-screen-xl mx-auto">
      <h2 className="text-center sm:text-lg text-base dark:text-gray-200 text-gray-700 font-normal text-balance leading-tight pb-6">
        Browse Curated Developer Resources on the Best Tools
      </h2>
      <div className="grid lg:grid-cols-8 rounded-lg lg:overflow-visible overflow-hidden divide-x lg:divide-y-0 divide-y dark:divide-gray-900 divide-gray-100 sm:grid-cols-4 grid-cols-2 bg-white dark:bg-gray-800">
        {topics.map((topic) => (
          <a
            key={topic.name}
            className="flex flex-col sm:aspect-square lg:first-of-type:rounded-l-lg lg:last-of-type:rounded-r-lg items-center dark:hover:shadow-none hover:shadow-xl hover:z-10 relative justify-center p-5 bg-transparent dark:bg-gray-800 dark:hover:bg-gray-700/50 hover:bg-white ease-in-out transition-all duration-200"
            href={topic.href}
            onClick={() => handleClick(topic.name)}
          >
            <div className="sm:w-auto w-10">
              <img src={topic.imgSrc} alt={topic.name} className="w-10 h-10" />
            </div>
            <h3 className="sm:text-base text-sm text-center sm:pt-3 pt-2">{topic.name}</h3>
          </a>
        ))}
      </div>
      {error && (
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm">
          Note: Using fallback data due to API connection issue: {error}
        </div>
      )}
    </div>
  );
};

export default BrowseTopics; 