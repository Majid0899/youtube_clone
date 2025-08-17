import React from 'react';
import { Link } from 'react-router-dom';
import timeAgo from '../utils/timeAgo';
import formatViews from '../utils/formatViews';

const VideoCard = ({ video }) => {
  /**
   * It takes video as a props
   * Display the video details
   * For view formating a function is used which format them in K,M,B.
   * For Uploading Formating a function is used which format the upload date in D,M,Y Ago.
   */
  return (
    <div className="cursor-pointer group rounded-xl  overflow-hidden shadow-sm  hover:shadow-neutral-600 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900">
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-t-xl">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Play Button Overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 transparent bg-opacity-80 text-white text-xs px-2 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex px-3 pb-3 space-x-3">
        {/* Channel Avatar (first letter) */}
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
          <Link to={`/channel/${video.channel.channelId}`}>
            {video.channel.channelName.slice(0,2)}
          </Link>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {video.channel.channelName}
          </p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-1">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{timeAgo(video.uploadDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
