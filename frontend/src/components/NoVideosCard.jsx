import React from 'react';
import FilterButtons from './FilterButtons';


const NoVideosCard = ({videos,setfinalVideos}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-86 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
     <FilterButtons videos={videos} setfinalVideos={setfinalVideos} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
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
      <h3 className="text-gray-600 text-lg font-medium">No Videos Found</h3>
      <p className="text-gray-400 text-sm mt-1">Try selecting a different category</p>
     
    </div>
  );
};

export default NoVideosCard;
