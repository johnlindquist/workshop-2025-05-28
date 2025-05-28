import React from 'react';
import FeedCard from './FeedCard';
import Pagination from './Pagination';

const placeholderImg = (width: number, height: number, text = '', bgColor = 'cccccc', textColor = '969696') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

const feedData = [
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
    authorImg: placeholderImg(32,32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'AI6'),
    href: '#',
  },
  {
    type: 'lesson',
    title: 'Automatically Improve Cursor Rules Using Custom Prompts',
    author: 'John Lindquist',
    authorImg: placeholderImg(32,32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CR'),
    href: '#',
  },
  {
    type: 'lesson',
    title: 'Clean up Legacy Functions for Testability in Cursor (0.50+) with cmd+k',
    author: 'John Lindquist',
    authorImg: placeholderImg(32,32, 'JL'),
    imgSrc: placeholderImg(85, 85, 'CMD'),
    href: '#',
  },
];

const FeedSection: React.FC = () => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: FeedSection component rendered.');
    }
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info(`INFO: FeedSection component rendered. Sort order changed to '${event.target.value}'.`);
    }
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 relative">
      <div className="max-w-screen-xl mx-auto w-full">
        <div>
          <div className="flex flex-col relative gap-3">
            <main className="flex flex-col col-span-full w-full relative dark:bg-gray-900 bg-gray-100">
              <div className="flex sm:items-end items-center justify-between">
                <h2 className="sm:px-5 px-3 sm:mt-4 lg:text-2xl sm:text-xl text-lg dark:text-white font-semibold leading-tight">The Feed</h2>
                <select 
                  className="border-0 flex items-center flex-shrink-0 space-x-2 flex-nowrap dark:bg-gray-900 h-full bg-gray-100 text-sm p-2 rounded mr-2"
                  onChange={handleSortChange}
                >
                  <option value="created_at">Recently Added</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="most_watched">Most Watched</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-3 p-3">
                {feedData.map((item, index) => (
                  <FeedCard key={index} item={item} />
                ))}
              </div>
              <Pagination />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSection; 