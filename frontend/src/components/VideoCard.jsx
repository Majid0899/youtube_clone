import React from 'react';

function formatViews(views) {
  if (views < 1000) return views.toString();
  if (views < 1_000_000) return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}

function timeAgo(uploadDate) {
  const now = new Date();
  const uploaded = new Date(uploadDate);

  const diffMs = now - uploaded; // difference in milliseconds

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = (now.getFullYear() - uploaded.getFullYear()) * 12 + (now.getMonth() - uploaded.getMonth());
  const diffYears = now.getFullYear() - uploaded.getFullYear();

  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else {
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  }
}


const VideoCard = ({ video }) => {
  return (
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
          {video.channel.channelName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm dark:text-white font-medium line-clamp-2 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-amber-600 mt-1 ">{video.channel.channelName}</p>
          <div className="flex items-center dark:text-blue-600 text-xs text-gray-600 mt-1 space-x-1">
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
