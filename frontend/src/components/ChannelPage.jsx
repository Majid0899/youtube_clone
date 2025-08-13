import React, { useState } from 'react';


function ChannelPage() {
  const [activeTab, setActiveTab] = useState('Home');
  const [videoFilter, setVideoFilter] = useState('Latest');

  // Sample channel data
  const channelData = {
    channelId: "channel01",
    channelName: "Internshala",
    owner: "user01",
    description: "Welcome to official YouTube channel of Internshala ...more",
    channelBanner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    subscribers: 117000,
    videos: [
      {
        id: "video01",
        title: "TCS Interview Questions & Answers | How To Crack TCS Interview as...",
        thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        views: "120 views",
        uploadTime: "1 day ago",
        duration: "8:32"
      },
      {
        id: "video02", 
        title: "Internshala Review - Data Science Placement Guarantee Course",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        views: "203 views",
        uploadTime: "7 days ago",
        duration: "12:45"
      },
      {
        id: "video03",
        title: "Internship Email Templates | How To Ask For An Internship Through...",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        views: "361 views",
        uploadTime: "2 weeks ago",
        duration: "15:20"
      },
      {
        id: "video04",
        title: "Google Technical Interview Questions & Answers For Freshers HR &...",
        thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        views: "478 views",
        uploadTime: "3 weeks ago",
        duration: "18:15"
      }
    ]
  };

  const tabs = ['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Community'];
  const videoFilters = ['Latest', 'Popular', 'Oldest'];

  const formatSubscribers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Channel Banner */}
      <div className="relative w-full  h-48  mt-12 md:h-64 bg-gradient-to-r from-blue-400 to-cyan-400 overflow-hidden">
        <img 
          src={channelData.channelBanner} 
          alt="Channel Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-white shadow-lg">
              IS
            </div>
          </div>

          {/* Channel Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {channelData.channelName}
                  <span className="ml-2 text-gray-500">•</span>
                </h1>
                <p className="text-gray-600 text-sm mb-1">
                  @internshalaofficial • {formatSubscribers(channelData.subscribers)} subscribers • {channelData.videos.length} videos
                </p>
                <p className="text-gray-600 text-sm">
                  {channelData.description}
                </p>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  internshala.com and 5 more links
                </a>
              </div>

              {/* Subscribe Button */}
              <div className="flex-shrink-0">
                <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
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
                className={`pb-3 px-1 whitespace-nowrap text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
            <button className="pb-3 px-1 text-gray-400">
              {/* <Search size={20} /> */}
            </button>
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
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channelData.videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* <Play className="text-white ml-1" size={20} fill="white" /> */}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {video.views} • {video.uploadTime}
                    </p>
                  </div>
                  <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    {/* <MoreVertical size={16} /> */}k
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

export default ChannelPage