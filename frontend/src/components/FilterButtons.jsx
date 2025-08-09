import React from 'react'

const FilterButtons = () => {
  const filters = ['All', 'Music', 'Gaming', 'Live', 'News', 'Comedy', 'Sports', 'Learning', 'Fashion', 'Podcast'];
  
  return (
    <div className="mb-6 flex space-x-3 overflow-x-auto scrollbar-hide scrollbar-custom">
      {filters.map((filter, index) => (
        <button 
          key={index}
          className={`px-3 py-1 rounded-lg whitespace-nowrap text-sm ${
            index === 0 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};


export default FilterButtons