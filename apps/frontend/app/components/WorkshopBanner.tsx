import React, { useEffect, useState } from 'react';

const WorkshopBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: WorkshopBanner component rendered.');
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative">
      <a href="#" className="group block">
        <div className="flex flex-col sm:flex-row items-center justify-center pl-2 text-xs text-white bg-gradient-to-r sm:px-2 sm:text-sm from-blue-500 to-indigo-500 py-1">
          <div className="flex sm:flex-row flex-col items-center gap-1 py-1 leading-tight">
            <div className="flex items-center gap-1">
              <span role="img" aria-hidden="true">🌟</span> Early Bird Discount Available:
            </div>
            <span>Live Cursor Workshop with John Lindquist</span>
          </div>
          <div className="flex items-center flex-shrink-0 px-2 py-px text-white underline">
            <span className="pr-1 font-medium">Claim your Spot</span>
            <span role="img" aria-hidden="true">→</span>
          </div>
        </div>
      </a>
      <button
        aria-label="Dismiss banner"
        className="absolute top-1 right-2 text-white bg-transparent hover:text-gray-200 text-lg"
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    </div>
  );
};

export default WorkshopBanner; 