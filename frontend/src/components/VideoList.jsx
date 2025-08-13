import React from 'react'
import { useSelector } from 'react-redux'

import VideoCard from './VideoCard'
import useVideo from '../utils/useVideo';
import Loading from './Loading';

const VideoList = ({videos}) => {
  const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
 

  return (

    <div className={`grid gap-4 ${sidebarOpen
      ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      } `}>
      {/* Render the cards  */}
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};


export default VideoList
