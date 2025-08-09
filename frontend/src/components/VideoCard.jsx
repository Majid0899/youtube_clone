import React from 'react'

const VideoCard = ({ video }) => {
  return (
    /*Take the video prop and render the data */
    <div className="cursor-pointer group">
      <div className="relative mb-3">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {video.description}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">{video.channelName}</p>
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <span>{video.views}</span>
            <span className="mx-1">•</span>
            <span>{video.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default VideoCard