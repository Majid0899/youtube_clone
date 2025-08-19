import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import ErrorVideos from "./ErrorState";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import Loading from "./Loading";
import formatViews from "../utils/formatViews";
import timeAgo from "../utils/timeAgo";
import formatSubscribers from "../utils/formatSubscribers";
import RecommendedVideos from "./RecommendedVideos";
import { useSelector } from "react-redux";

const WatchVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.user.id);
  const { id } = useParams();

  //fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:5100/video/${id}`);
        setVideo(response.data.video);
        setSubscriberCount(
          response.data.video.channel?.subscribers?.length || 0
        );

        if (token) {
          checkSubscriptionStatus(response.data.video.channel?.channelId);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || "Server error");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError(error.message);
        }
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token, userId]);

  //Checks the state of subscriber
  const checkSubscriptionStatus = async (channelId) => {
    try {
      const response = await axios.get(
        `http://localhost:5100/channel/${channelId}`
      );
      setIsSubscribed(
        response.data.channel.subscribers.some((item) => item._id === userId)
      );
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  //handlesubscribe
  const handleSubscribe = async (channelId) => {
    if (!token) {
      setError("Please login to subscribe");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5100/channel/${channelId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsSubscribed(!isSubscribed);
      setSubscriberCount(response.data.subscribers);
    } catch (error) {
      setError("Failed to update subscription");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorVideos
        message="Error Loading Videos"
        details="Please check your internet connection or try again later."
      />
    );
  }

  if (!video) {
    return <Loading />;
  }

  //handle like
  const handlelike = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:5100/video/like/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideo((prevVideo) => ({
        ...prevVideo,
        likes: response.data.video.likes,
        dislikes: response.data.video.dislikes,
      }));
    } catch (error) {
      setError("Failed to like video");
    }
  };

  //handle dislikes
  const handledislike = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:5100/video/dislike/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideo((prevVideo) => ({
        ...prevVideo,
        dislikes: response.data.video.dislikes,
        likes: response.data.video.likes,
      }));
    } catch (error) {
      setError("Failed to dislike video");
    }
  };

  return (
      <div className="flex flex-col lg:flex-row dark:bg-gray-900 max-w-7xl md:max-w-8xl mt-12 md:mt-14 px-3 sm:px-6 lg:px-8 gap-6">
      {/* Left (Main Video Section) */}
      <div className="flex-1 py-2 w-full">
        <VideoPlayer video={video} />

        <div className="mt-4 border-b border-gray-300 pb-4">
          <h1 className="text-lg sm:text-xl dark:text-white font-semibold mb-2">
            {video.title}
          </h1>
          <p className="dark:text-white">{video.description}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-gray-600 text-sm dark:text-white">
            <p>
              {formatViews(video.views)} • {timeAgo(video.uploadDate)}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlelike(video._id)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 dark:bg-slate-700 rounded-full"
                disabled={!token}
              >
                👍{video.likes?.length || 0}
              </button>
              <button
                onClick={() => handledislike(video._id)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 dark:bg-slate-700 rounded-full"
                disabled={!token}
              >
                👎{video.dislikes?.length || 0}
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 dark:bg-slate-700 bg-gray-200 rounded-full">
                Share
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 dark:bg-slate-700 bg-gray-200 rounded-full">
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex justify-between items-center mt-4 pb-4 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full">
              <img src={video.uploader.avatar} className="rounded-full" />
            </div>
            <div>
              <p className="font-medium dark:text-white">
                {video.channel?.channelName}
              </p>
              <p className="text-xs sm:text-sm dark:text-white text-gray-500">
                {formatSubscribers(subscriberCount)} subscribers
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSubscribe(video.channel.channelId)}
            className={`px-4 py-2 sm:px-6 rounded-full transition-colors ${
              token
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!token}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <Comments videoId={video._id} />
        </div>
      </div>

      {/* Right (Recommended Videos) */}
      <div className="w-full lg:w-1/3">
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default WatchVideo;
