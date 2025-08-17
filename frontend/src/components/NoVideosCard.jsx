import React from 'react';
import FilterButtons from './FilterButtons';


const NoVideosCard = ({ videos, setfinalVideos }) => {
  return (

    <div className='flex flex-col justify-center mt-20 mx-22'>
      {/* Filter Buttons */}
      <FilterButtons videos={videos} setfinalVideos={setfinalVideos} />
      <div className="flex flex-col items-center justify-center w-full h-86 border-2 border-dashed border-gray-300 rounded-lg dark:bg-gray-900 bg-gray-50">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-4 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
          />
        </svg>
        <h3 className="text-gray-600 text-lg dark:text-white font-medium">No Videos Found</h3>
        <p className="text-gray-400 text-sm mt-1 dark:text-white">Try selecting a different category or Search Text</p>
      </div>
    </div>

  );
};

export default NoVideosCard;
