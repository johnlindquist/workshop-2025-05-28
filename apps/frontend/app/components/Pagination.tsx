import React from 'react';

const Pagination: React.FC = () => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Pagination component rendered.');
    }
  }, []);

  const handlePageClick = (page: string | number) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info(`INFO: Pagination component rendered. Page '${page}' clicked.`);
    }
  };

  return (
    <div className="pb-16 pt-10 flex-grow">
      <div className="flex justify-center">
        <ul className="flex items-center space-x-1 text-sm">
          <li>
            <span 
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              onClick={() => handlePageClick('First')}
            >
              First
            </span>
          </li>
          <li>
            <span 
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              onClick={() => handlePageClick('Previous')}
            >
              Previous
            </span>
          </li>
          {[1, 2, 3, 4, 5, 6, 7].map(page => (
            <li key={page}>
              <a 
                href="#" 
                className={`px-3 py-1 rounded border ${page === 1 ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#" 
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('Next');
              }}
            >
              Next
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick('Last');
              }}
            >
              Last
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination; 