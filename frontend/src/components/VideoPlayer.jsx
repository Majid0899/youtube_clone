import React, { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (isPlaying) {
      vid.pause();
    } else {
      vid.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        controls
        onClick={togglePlay}
        poster={video?.thumbnail || ""}
      >
        <source src={video?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play / Pause overlay */}
      <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition"
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
