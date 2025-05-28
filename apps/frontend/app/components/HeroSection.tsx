import React from 'react';

const HeroSection: React.FC = () => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: HeroSection component rendered.');
    }
  }, []);

  const handleFocus = () => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: HeroSection component rendered. Search input focused/changed.');
    }
  };

  const handleChange = handleFocus;

  return (
    <section aria-label="search or browse sections">
      <div className="lg:pt-20 sm:pt-16 pt-10 px-5 flex flex-col bg-gradient-to-b dark:from-gray-800/50 from-gray-200 to-transparent items-center w-full">
        <form action="#" role="search" className="w-full">
          <h1 className="text-center lg:text-3xl text-balance max-w-3xl mx-auto sm:text-2xl text-2xl font-bold leading-tighter sm:pb-20 pb-10">
            Bite-Sized Screencasts for Web Developers that Hate Long Boring Videos
          </h1>
          <div className="max-w-2xl w-full mx-auto relative flex items-center shadow-md rounded-lg">
            <input
              name="query"
              type="search"
              placeholder="React, TypeScript, AWS, CSS..."
              autoComplete="off"
              className="w-full py-4 px-5 pr-16 lg:text-lg sm:text-base text-sm rounded-lg dark:bg-gray-900 border dark:border-gray-800 bg-white border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              defaultValue=""
              onFocus={handleFocus}
              onChange={handleChange}
            />
            <button type="submit" className="flex items-center gap-2 sm:text-base font-medium text-sm absolute px-5 text-white right-0 bg-gradient-to-t from-blue-600 to-blue-500 h-full rounded-r-lg transition-all ease-in-out duration-200">
              <span className="text-lg">🔍</span>
              <span className="sm:not-sr-only sr-only">Search egghead</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection; 