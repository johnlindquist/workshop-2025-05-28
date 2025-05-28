import React from 'react';

const placeholderImg = (width: number, height: number, text = '', bgColor = '3B82F6', textColor = 'FFFFFF') =>
  `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;

type HeaderProps = {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
};

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Header component rendered.');
    }
  }, []);

  const handleToggle = () => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Header component rendered. Dark mode toggle clicked.');
    }
    toggleDarkMode();
  };

  return (
    <nav aria-label="header" className="h-12 text-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 print:hidden dark:text-white text-gray-900">
      <div className="container mx-auto flex items-center justify-between w-full h-full px-4">
        <div className="flex h-full relative z-50">
          <a className="flex items-center pr-2" href="#">
            <img src={placeholderImg(33,34, 'Logo', '3B82F6', 'FFFFFF')} alt="egghead.io logo" className="mr-1 sm:w-8 w-7 h-auto" />
            <span className="inline-block text-base font-semibold sm:text-lg">egghead.io</span>
          </a>
          <div className="hidden items-center h-full md:flex">
            <button className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" type="button">
              <span className="text-gray-600 dark:text-gray-400 text-xl">📚</span>
              <span>Topics</span>
              <span className="h-4 -ml-1 text-gray-600 dark:text-gray-400 mt-px">▼</span>
            </button>
            <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">
              <span className="lg:block hidden text-gray-600 dark:text-gray-400 text-xl">💻</span>
              Courses
            </a>
          </div>
        </div>
        <div className="flex items-center h-full lg:-mr-6">
          <form action="#" role="search" className="sm:border-x dark:border-white border-gray-900 dark:border-opacity-5 border-opacity-5 sm:max-w-[220px] lg:block hidden">
            <div className="relative flex dark:hover:border-white pl-3 hover:border-opacity-30 dark:hover:border-opacity-30 justify-between">
              <input name="query" type="search" aria-label="Search" placeholder="Search" autoComplete="off" className="dark:placeholder-opacity-60 placeholder-opacity-60 dark:placeholder-white placeholder-black bg-transparent sm:text-sm text-base w-full h-12 focus:ring-0 border-none p-0" defaultValue="" />
              <button type="submit" className="p-3 flex items-center dark:hover:bg-white hover:bg-gray-50 dark:hover:bg-opacity-5">
                <span className="text-current text-lg">🔍</span>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
          <div className="flex items-center px-1 h-full">
            <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">Enroll Today</a>
          </div>
          <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">Sign in</a>
          <button onClick={handleToggle} className="p-2 ml-2 text-lg" aria-label="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header; 