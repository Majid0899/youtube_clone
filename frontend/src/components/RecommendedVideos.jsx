import React from "react";

const dummyVideos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Dummy Video Title ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${(Math.random() * 1000).toFixed(1)}K views`,
  time: `${Math.floor(Math.random() * 12) + 1} hours ago`,
  thumbnail: "https://via.placeholder.com/200x120",
}));

const RecommendedVideos = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold dark:text-white">Recommended</h2>

      {dummyVideos.map((video) => (
        <div
          key={video.id}
          className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-2 shadow hover:shadow-md transition"
        >
          {/* Thumbnail */}
          <div className="w-32 sm:w-36 md:w-40 flex-shrink-0 h-20 sm:h-24 bg-gray-300 rounded-lg overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium dark:text-white text-sm sm:text-base line-clamp-2">
              {video.title}
            </p>
            <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-500 truncate">
              {video.channel}
            </p>
            <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-500">
              {video.views} • {video.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default RecommendedVideos;
