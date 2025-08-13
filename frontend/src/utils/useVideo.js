import React, { useEffect, useState } from "react";
import axios from "axios";


const useVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios("http://localhost:5100/video");
        
        setVideos(response.data.videos);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || "Server error");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError(error.message);
        }
        setVideos([])
      }finally{
        setLoading(false)
      }
    }
    fetchVideos()
  }, []);
  return {videos,loading,error}
};

export default useVideo;
