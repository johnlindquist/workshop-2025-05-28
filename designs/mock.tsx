import React, { useState, useEffect } from 'react';

// Helper function to generate placeholder image URLs
const placeholderImg = (width, height, text = '', bgColor = 'cccccc', textColor = '969696') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Data for topics and feed items (mock data)
const topicsData = [
  { name: 'React', href: '#', imgSrc: placeholderImg(40, 40, 'R') },
  { name: 'Next.js', href: '#', imgSrc: placeholderImg(40, 40, 'N') },
  { name: 'TypeScript', href: '#', imgSrc: placeholderImg(40, 40, 'TS') },
  { name: 'JavaScript', href: '#', imgSrc: placeholderImg(40, 40, 'JS') },
  { name: 'Remix', href: '#', imgSrc: placeholderImg(40, 40, 'Rx') },
  { name: 'Redux', href: '#', imgSrc: placeholderImg(40, 40, 'Rd') },
  { name: 'Supabase', href: '#', imgSrc: placeholderImg(40, 40, 'S') },
  { name: 'Angular', href: '#', imgSrc: placeholderImg(40, 40, 'A') },
];

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

// --- Components ---

// Workshop Banner Component
const WorkshopBanner = () => (
  <a href="#" className="group">
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
);

// Header Component
const Header = ({ toggleDarkMode, isDarkMode }) => (
  <nav aria-label="header" className="h-12 text-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 print:hidden dark:text-white text-gray-900">
    <div className="container mx-auto flex items-center justify-between w-full h-full px-4">
      <div className="flex h-full relative z-50">
        <a className="flex items-center pr-2" href="#">
          {/* Placeholder for SVG Logo */}
          <img src={placeholderImg(33,34, 'Logo', '3B82F6', 'FFFFFF')} alt="egghead.io logo" className="mr-1 sm:w-8 w-7 h-auto" />
          <span className="inline-block text-base font-semibold sm:text-lg">egghead.io</span>
        </a>
        <div className="hidden items-center h-full md:flex">
          <button className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" type="button">
            {/* Placeholder for Book Icon */}
            <span className="text-gray-600 dark:text-gray-400 text-xl">📚</span>
            <span>Topics</span>
            {/* Placeholder for Chevron Icon */}
            <span className="h-4 -ml-1 text-gray-600 dark:text-gray-400 mt-px">▼</span>
          </button>
          <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">
            {/* Placeholder for Code Icon */}
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
              {/* Placeholder for Search Icon */}
              <span className="text-current text-lg">🔍</span>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
        <div className="flex items-center px-1 h-full">
          <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">Enroll Today</a>
        </div>
        <a className="flex items-center h-full px-3 dark:hover:bg-white transition hover:bg-gray-50 gap-1 dark:hover:bg-opacity-5" href="#">Sign in</a>
        <button onClick={toggleDarkMode} className="p-2 ml-2 text-lg">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = () => (
  <section aria-label="search or browse sections">
    <div className="lg:pt-20 sm:pt-16 pt-10 px-5 flex flex-col bg-gradient-to-b dark:from-gray-800/50 from-gray-200 to-transparent items-center w-full">
      <form action="#" role="search" className="w-full">
        <h1 className="text-center lg:text-3xl text-balance max-w-3xl mx-auto sm:text-2xl text-2xl font-bold leading-tighter sm:pb-20 pb-10">
          Bite-Sized Screencasts for Web Developers that Hate Long Boring Videos
        </h1>
        <div className="max-w-2xl w-full mx-auto relative flex items-center shadow-md rounded-lg">
          <input name="query" type="search" placeholder="React, TypeScript, AWS, CSS..." autoComplete="off" className="w-full py-4 px-5 pr-16 lg:text-lg sm:text-base text-sm rounded-lg dark:bg-gray-900 border dark:border-gray-800 bg-white border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400" defaultValue="" />
          <button type="submit" className="flex items-center gap-2 sm:text-base font-medium text-sm absolute px-5 text-white right-0 bg-gradient-to-t from-blue-600 to-blue-500 h-full rounded-r-lg transition-all ease-in-out duration-200">
            {/* Placeholder for Search Icon */}
            <span className="text-lg">🔍</span>
            <span className="sm:not-sr-only sr-only">Search egghead</span>
          </button>
        </div>
      </form>
    </div>
  </section>
);

// Browse Topics Component
const BrowseTopics = () => (
  <div className="sm:pt-16 px-3 pt-8 sm:pb-16 pb-8 max-w-screen-xl mx-auto">
    <h2 className="text-center sm:text-lg text-base dark:text-gray-200 text-gray-700 font-normal text-balance leading-tight pb-6">
      Browse Curated Developer Resources on the Best Tools
    </h2>
    <div className="grid lg:grid-cols-8 rounded-lg lg:overflow-visible overflow-hidden divide-x lg:divide-y-0 divide-y dark:divide-gray-900 divide-gray-100 sm:grid-cols-4 grid-cols-2 bg-white dark:bg-gray-800">
      {topicsData.map((topic) => (
        <a key={topic.name} className="flex flex-col sm:aspect-square lg:first-of-type:rounded-l-lg lg:last-of-type:rounded-r-lg items-center dark:hover:shadow-none hover:shadow-xl hover:z-10 relative justify-center p-5 bg-transparent dark:bg-gray-800 dark:hover:bg-gray-700/50 hover:bg-white ease-in-out transition-all duration-200" href={topic.href}>
          <div className="sm:w-auto w-10">
            <img src={topic.imgSrc} alt={topic.name} className="w-10 h-10" />
          </div>
          <h3 className="sm:text-base text-sm text-center sm:pt-3 pt-2">{topic.name}</h3>
        </a>
      ))}
    </div>
  </div>
);

// Feed Card Component
const FeedCard = ({ item }) => (
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


// Feed Section Component
const FeedSection = () => (
  <div className="dark:bg-gray-900 bg-gray-100 relative">
    <div className="max-w-screen-xl mx-auto w-full">
      <div>
        <div className="flex flex-col relative gap-3">
          <main className="flex flex-col col-span-full w-full relative dark:bg-gray-900 bg-gray-100">
            <div className="flex sm:items-end items-center justify-between">
              <h2 className="sm:px-5 px-3 sm:mt-4 lg:text-2xl sm:text-xl text-lg dark:text-white font-semibold leading-tight">The Feed</h2>
              <select className="border-0 flex items-center flex-shrink-0 space-x-2 flex-nowrap dark:bg-gray-900 h-full bg-gray-100 text-sm p-2 rounded mr-2">
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

// Pagination Component
const Pagination = () => (
  <div className="pb-16 pt-10 flex-grow">
    <div className="flex justify-center">
      <ul className="flex items-center space-x-1 text-sm">
        <li><span className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500">First</span></li>
        <li><span className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500">Previous</span></li>
        {[1, 2, 3, 4, 5, 6, 7].map(page => (
          <li key={page}>
            <a href="#" className={`px-3 py-1 rounded border ${page === 1 ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {page}
            </a>
          </li>
        ))}
        <li><a href="#" className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">Next</a></li>
        <li><a href="#" className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">Last</a></li>
      </ul>
    </div>
  </div>
);

// Footer Component
const Footer = ({ toggleDarkMode, isDarkMode }) => (
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
            onClick={toggleDarkMode}
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


// Main App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode as per HTML

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col min-h-screen antialiased ${isDarkMode ? 'dark bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
      {/* This div is for the NProgress-like loader, simplified or omitted */}
      {/* <div className="fixed top-0 left-0 w-full h-0.5 bg-blue-500 z-[1031]"></div> */}
      
      {/* This div is for toasts/notifications, simplified or omitted */}
      {/* <div style={{position: 'fixed', zIndex: 9999, top: '16px', left: '16px', right: '16px', bottom: '16px', pointerEvents: 'none'}}></div> */}

      <WorkshopBanner />
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
      
      <div className="w-full flex flex-col flex-grow">
        <HeroSection />
        <BrowseTopics />
        <FeedSection />
      </div>
      
      <Footer toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
    </div>
  );
}

export default App;
