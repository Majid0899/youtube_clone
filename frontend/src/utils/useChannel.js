import React, { useEffect, useState } from "react";
import axios from "axios";


const useChannel = (channelId,reload) => {
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
     
        const response = await axios(`http://localhost:5100/channel/${channelId}`);
        
        setChannel(response.data.channel);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || "Server error");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError(error.message);
        }
        setChannel([])
      }finally{
        setLoading(false)
      }
    }
    fetchVideos()
  }, [channelId,reload]);
  return {channel,loading,error}
};

export default useChannel;
