import React from 'react'
import { useDispatch } from 'react-redux';
import { addSearchText } from '../redux/searchSlice';

const FilterButtons = ({ videos, setfinalVideos }) => {

  /**
   * Filter Buttons Stored in Array 
   * Accept videos and setfinalVideos props 
   * 
   */
  const filters = ['All', 'Music', 'Coding', 'Travel', 'News', 'Comedy', 'Food', 'Education', 'Technology', 'Podcast','Gaming','Skills'];
  
  const dispatch=useDispatch()
  
  /**
   * Handle Filter Videos
   * Based On the filter
   * Update the redux state
   */
  const handleFilterVideos = (filterValue) => {
    dispatch(addSearchText(""))
    if (filterValue === 'All') {
      setfinalVideos(videos); 
    } else {
      const filteredVideos = videos.filter(
        (video) => video.category.trim().toLowerCase() === filterValue.toLowerCase().trim()
      );
      setfinalVideos(filteredVideos);
    }
  }

  return (
    <div className="mb-6 flex space-x-3 overflow-x-auto scrollbar-hide scrollbar-custom">
      {filters.map((filter, index) => (
        <button 
          onClick={() => handleFilterVideos(filter)}
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

export default FilterButtons;
