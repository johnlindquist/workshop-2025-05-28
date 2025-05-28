import React from 'react';

const topicsData = [
  { name: 'React', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=R' },
  { name: 'Next.js', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=N' },
  { name: 'TypeScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=TS' },
  { name: 'JavaScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=JS' },
  { name: 'Remix', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rx' },
  { name: 'Redux', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rd' },
  { name: 'Supabase', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=S' },
  { name: 'Angular', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=A' },
];

const BrowseTopics: React.FC = () => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info('INFO: BrowseTopics component rendered.');
    }
  }, []);

  const handleClick = (name: string) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info(`INFO: BrowseTopics component rendered. Topic '${name}' clicked.`);
    }
  };

  return (
    <div className="sm:pt-16 px-3 pt-8 sm:pb-16 pb-8 max-w-screen-xl mx-auto">
      <h2 className="text-center sm:text-lg text-base dark:text-gray-200 text-gray-700 font-normal text-balance leading-tight pb-6">
        Browse Curated Developer Resources on the Best Tools
      </h2>
      <div className="grid lg:grid-cols-8 rounded-lg lg:overflow-visible overflow-hidden divide-x lg:divide-y-0 divide-y dark:divide-gray-900 divide-gray-100 sm:grid-cols-4 grid-cols-2 bg-white dark:bg-gray-800">
        {topicsData.map((topic) => (
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
    </div>
  );
};

export default BrowseTopics; 