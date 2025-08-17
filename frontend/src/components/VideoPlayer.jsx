import React, { useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        controls
        onClick={togglePlay}
        poster="data:image/svg+xml,%3Csvg xmlns='https://i.ytimg.com/vi/u5RMe3Jg3t8/hqdefault.jpg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23111827'/%3E%3Ctext x='400' y='225' text-anchor='middle' fill='%236B7280' font-family='Arial' font-size='24'%3ESample Video%3C/text%3E%3C/svg%3E"
      >
        <source src="https://www.youtube.com/watch?v=CevxZvSJLk8" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Simple play/pause button overlay */}
      <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-opacity"
      >
        {isPlaying ? (
          <PauseIcon className="w-8 h-8 text-white" />
        ) : (
          <PlayArrowIcon className="w-8 h-8 text-white ml-1" />
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;