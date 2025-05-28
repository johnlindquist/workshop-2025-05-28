import React from 'react';

type FeedCardProps = {
  item: {
    type: string;
    title: string;
    author: string;
    authorImg: string;
    imgSrc: string;
    href: string;
    isLarge?: boolean;
  };
};

const FeedCard: React.FC<FeedCardProps> = ({ item }) => (
  <a
    href={item.href}
    className={`${item.isLarge ? 'row-span-2 col-span-1' : ''} rounded-md w-full h-full transition-all ease-in-out duration-200 relative overflow-hidden group dark:bg-gray-800 bg-white dark:bg-opacity-60 shadow-md dark:hover:bg-gray-700 dark:hover:bg-opacity-50 ${item.isLarge ? 'aspect-[3/4] flex flex-col justify-center items-center px-8' : 'aspect-[3/1] sm:aspect-[4/2] flex'}`}
  >
    <div className={`flex ${item.isLarge ? 'flex-col items-center p-2 pt-5 text-center' : 'justify-center items-center sm:space-x-5 space-x-3 sm:px-5 px-3 py-2 w-full'}`}>
      <div className={`flex items-center justify-center ${item.isLarge ? 'w-fit relative -mx-5 -mt-5' : 'flex-shrink-0 w-16'}`}>
        <img src={item.imgSrc} alt="" className={`${item.isLarge ? 'w-[150px] h-[150px]' : 'w-[85px] h-[85px]'}`} />
      </div>
      <div className={`${item.isLarge ? 'row-span-3 text-center flex flex-col items-center justify-center pt-6' : ''}`}>
        <p aria-hidden="true" className="uppercase font-medium lg:text-[0.65rem] sm:text-[0.65rem] text-[0.55rem] pb-1 text-gray-700 dark:text-indigo-100 flex items-center">
          <span className="opacity-60">{item.type}</span>
        </p>
        <h3 className={`${item.isLarge ? 'lg:h-[70px] h-[45px]' : 'lg:h-[60px] md:h-[55px] sm:h-[50px] h-[36px]'} font-medium leading-tight flex items-center ${item.isLarge ? 'justify-center w-full text-lg' : 'max-w-[285px] text-base'}`}> 
          <div>{item.title}</div>
        </h3>
        <div className={`flex items-center pt-2 ${item.isLarge ? 'justify-center' : ''}`}>
          <div className="w-5 h-5 overflow-hidden flex-shrink-0 rounded-full lg:w-7 lg:h-7">
             <img src={item.authorImg} alt={item.author} className="rounded-full w-full h-full object-cover" />
          </div>
          <span className="text-left pl-2 dark:text-indigo-100 text-gray-700 lg:text-sm text-[0.65rem] opacity-80 leading-none">
            <span className="sr-only">{item.type} by </span>{item.author}
          </span>
        </div>
      </div>
    </div>
  </a>
);

export default FeedCard; 