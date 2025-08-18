import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useChannel from "../utils/useChannel";
import Loading from "./Loading";
import timeAgo from "../utils/timeAgo";
import formatViews from "../utils/formatViews";
import axios from "axios";
import { useSelector } from "react-redux";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import formatSubscribers from "../utils/formatSubscribers";

function ChannelPage() {
  // State management
  const [activeTab, setActiveTab] = useState("Home");
  const [videoFilter, setVideoFilter] = useState("Latest");
  const [serverError, setServerError] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isSubscribe, setisSubscribe] = useState(false);

  // Redux user data
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const avatar = useSelector((state) => state.user.avatar);

  // Get channel id from URL params
  const { id } = useParams();

  // Custom hook to fetch channel data
  const { channel, loading, error } = useChannel(id);

  // Update subscribe state when channel data loads
  useEffect(() => {
    if (!loading && channel) {
      setSubscriberCount(channel.subscribers.length);
      setisSubscribe(channel.subscribers.includes(userId));
    }
  }, [channel, loading, userId]);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <ErrorChannel
        message="Failed to load channel data"
        details="Server might be down. Please refresh the page."
      />
    );
  }

  // No channel found
  if (!channel && !channel.channelName) {
    return (
      <p className="flex justify-center items-center border border-black max-h-20">
        No channel found
      </p>
    );
  }

  // Handle Subscribe/Unsubscribe action
  async function handleSubscribe() {
    try {
      const response = await axios.put(
        `http://localhost:5100/channel/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Toggle subscribe/unsubscribe locally
      if (isSubscribe) {
        setSubscriberCount((prev) => prev - 1);
      } else {
        setSubscriberCount((prev) => prev + 1);
      }
      setisSubscribe(!isSubscribe);
    } catch (error) {
      if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected server error occurred");
      }
    }
  }

  // Tabs & Filters
  const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Community"];
  const videoFilters = ["Latest", "Popular", "Oldest"];

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white">
      {/* Channel Banner */}
      <div className="relative w-full h-48 mt-12 md:h-64 bg-gradient-to-r from-blue-400 to-cyan-400 overflow-hidden">
        <img
          src={channel.channelBanner}
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-6 ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-white shadow-lg">
              <img src={channel.owner.avatar} className="rounded-full" />
            </div>
          </div>

          {/* Channel Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl dark:text-white font-bold text-gray-900 mb-1">
                  {channel.channelName}
                  <span className="ml-2 font-bold text-gray-500">•</span>
                </h1>
                <p className="text-gray-600 text-sm dark:text-white mb-1">
                  {id} • {formatSubscribers(subscriberCount)} subscribers •{" "}
                  {channel.videos.length} videos
                </p>
                <p className="text-gray-600 text-sm dark:text-white">
                  {channel.description}
                </p>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  {channel.channelName} and 5 more links
                </a>
              </div>

              {/* Subscribe Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleSubscribe}
                  className={`px-6 py-2 rounded-full font-medium transition-colors
                    ${
                      token
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  disabled={!token}
                >
                  {isSubscribe ? "UnSubscribe" : "Subscribe"}
                </button>
                {serverError && (
                  <div className="text-red-500 text-sm mt-1">{serverError}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 dark:text-white whitespace-nowrap text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-black border-b-2 dark:text-white border-black"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-6">
          {/* Video Filters */}
          <div className="flex space-x-2 mb-6">
            {videoFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setVideoFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  videoFilter === filter
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channel.videos.map((video) => (
              <div key={video._id} className="group cursor-pointer">
                {/* Video Thumbnail */}
                <Link to={`/watch/${video._id}`}>
                  {" "}
                  <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {/* Duration Badge */}
                    <div className="absolute dark:text-white bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircleOutlineIcon className="w-8 h-8 " />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Video Info */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm dark:text-white font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs dark:text-white text-gray-600">
                      {formatViews(video.views)} • {timeAgo(video.uploadDate)}
                    </p>
                  </div>
                  <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    ⋮
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;
