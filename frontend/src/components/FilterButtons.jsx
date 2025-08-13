import React from 'react'
import { useDispatch } from 'react-redux';
import { addSearchText } from '../redux/searchSlice';

const FilterButtons = ({ videos, setfinalVideos }) => {
  const filters = ['All', 'Music', 'Gaming', 'Live', 'News', 'Comedy', 'Sports', 'Learning', 'Fashion', 'Podcast'];
  const dispatch=useDispatch()
  const handleFilterVideos = (filterValue) => {
    dispatch(addSearchText(""))
    if (filterValue === 'All') {
      setfinalVideos(videos); // show all videos
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
