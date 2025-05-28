import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: Pagination component rendered.');
    }
  }, []);

  const handlePageClick = (page: number, label?: string) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      
      if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
        // eslint-disable-next-line no-console
        console.info(`INFO: Pagination component rendered. Page '${label || page}' clicked.`);
      }
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);
      
      // Adjust if we're near the beginning or end
      if (endPage - startPage + 1 < maxVisiblePages) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="pb-16 pt-10 flex-grow">
      <div className="flex justify-center">
        <ul className="flex items-center space-x-1 text-sm">
          <li>
            <span 
              className={`px-3 py-1 rounded border ${
                isFirstPage 
                  ? 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
              }`}
              onClick={() => !isFirstPage && handlePageClick(1, 'First')}
            >
              First
            </span>
          </li>
          <li>
            <span 
              className={`px-3 py-1 rounded border ${
                isFirstPage 
                  ? 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
              }`}
              onClick={() => !isFirstPage && handlePageClick(currentPage - 1, 'Previous')}
            >
              Previous
            </span>
          </li>
          {pageNumbers.map(page => (
            <li key={page}>
              <span 
                className={`px-3 py-1 rounded border cursor-pointer ${
                  page === currentPage 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </span>
            </li>
          ))}
          <li>
            <span 
              className={`px-3 py-1 rounded border ${
                isLastPage 
                  ? 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
              }`}
              onClick={() => !isLastPage && handlePageClick(currentPage + 1, 'Next')}
            >
              Next
            </span>
          </li>
          <li>
            <span 
              className={`px-3 py-1 rounded border ${
                isLastPage 
                  ? 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
              }`}
              onClick={() => !isLastPage && handlePageClick(totalPages, 'Last')}
            >
              Last
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination; 