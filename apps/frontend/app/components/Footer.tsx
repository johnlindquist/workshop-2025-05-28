import React from 'react';

const placeholderImg = (width: number, height: number, text = '', bgColor = '3B82F6', textColor = 'FFFFFF') =>
  `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;

type FooterProps = {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
};

const Footer: React.FC<FooterProps> = ({ toggleDarkMode, isDarkMode }) => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Footer component rendered.');
    }
  }, []);

  const handleToggle = () => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Footer component rendered. Dark mode toggle clicked.');
    }
    toggleDarkMode();
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-800/50 print:hidden dark:text-gray-200">
      <div className="container mx-auto px-4">
        <nav aria-label="footer" className="flex flex-col items-center justify-between w-full gap-6 pt-16 pb-16 space-y-6 md:space-y-0 md:flex-row md:items-start md:pt-14 lg:pb-40">
          <div className="flex flex-col items-center h-full space-y-5 md:items-start max-w-[18rem]">
            <a className="flex flex-col items-center space-y-3 text-center md:flex-row md:items-start md:text-left md:space-x-2 md:space-y-0" href="#">
              <div className="flex-shrink-0 w-12 md:w-8">
                 <img src={placeholderImg(33,34, 'Logo', '3B82F6', 'FFFFFF')} alt="egghead.io logo" className="h-auto" />
              </div>
              <div className="mt-1 text-lg font-semibold tracking-tight leading-tighter">
                Expert led courses for professional front-end web developers.
              </div>
            </a>
          </div>
          <div className="grid items-center w-full grid-cols-1 text-center md:grid-cols-2 lg:pr-6 md:gap-10 md:text-left md:items-start md:w-auto">
            <ul>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Search</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Articles</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Talks</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Podcasts</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Topics</a></li>
            </ul>
            <ul>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Pricing</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">egghead for teams</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="#">Store</a></li>
              <li className="py-1 text-base leading-relaxed md:text-sm"><a className="transition-colors duration-150 ease-in-out dark:hover:text-blue-400 hover:text-blue-600" href="mailto:support@egghead.io">support@egghead.io</a></li>
            </ul>
          </div>
        </nav>
        <small className="flex items-center justify-center w-full py-6 space-x-6 text-xs text-gray-500 md:justify-end dark:text-gray-300">
          <div>©egghead.io</div>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">FAQ</a>
          <div className="flex items-center justify-between">
            <span className="hidden mr-3 sm:block">Dark Mode</span>
            <button
              onClick={handleToggle}
              className="flex-shrink-0 w-16 h-8 p-1 bg-gray-300 rounded-full dark:bg-gray-700"
              aria-label="Toggle Dark Mode"
              role="button"
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md duration-300 ease-in-out flex items-center justify-center dark:bg-gray-900 ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}>
                {isDarkMode ? <span className="text-yellow-400">☀️</span> : <span className="text-gray-500">🌙</span>}
              </div>
            </button>
          </div>
        </small>
      </div>
    </footer>
  );
};

export default Footer; 