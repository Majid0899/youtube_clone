import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useChannel from '../utils/useChannel';
import Loading from './Loading';
import ErrorVideos from './ErrorState';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


function ChannelPage() {
  const [activeTab, setActiveTab] = useState('Home');
  const [videoFilter, setVideoFilter] = useState('Latest');
  const [serverError,setServerError]=useState("")
  const [subscriberCount,setSubscriberCount]=useState(0)
  const [isSubscribe,setisSubscribe]=useState(false)
  const token=useSelector((state)=>state.user.token)
  const userId = useSelector((state) => state.user.id);
  const avatar=useSelector((state)=>state.user.avatar)
  const {id}=useParams()
  
  const {channel,loading,error}=useChannel(id);

  
  useEffect(()=>{
    if(!loading && channel){
      setSubscriberCount(channel.subscribers.length)
       setisSubscribe(channel.subscribers.includes(userId)); 

    }
  },[channel,loading,userId])

  console.log(subscriberCount)

  if(loading){
    return (<Loading />)
  }

  if (error) {
        return (<ErrorChannel   message="Failed to load channel data" 
  details="Server might be down. Please refresh the page."  />)
    }


  if(!channel && !channel.channelName ){
    return <p className='flex justify-center items-center border border-black max-h-20'>No channel found</p>
  }
  


async function handleSubscribe() {
  try {
    const response = await axios.put(
      `http://localhost:5100/channel/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
     // Toggle Subscribe
     if(isSubscribe){
      setSubscriberCount((prev)=>prev-1)
     }else{
      setSubscriberCount((prev)=>prev+1)
     }

     setisSubscribe(!isSubscribe)
    

  } catch (error) {
    if (error.response?.data?.error) {
      setServerError(error.response.data.error);
    } else {
      setServerError("An unexpected server error occurred");
    }
  }
}


  

 

  const tabs = ['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Community'];
  const videoFilters = ['Latest', 'Popular', 'Oldest'];

   const formatSubscribers = (count) => {
    if (typeof count !== "number") return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };
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
function formatViews(views) {
  if (views < 1000) return views.toString();
  if (views < 1_000_000) return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}
  return (
    <div className="min-h-screen bg-white">
      {/* Channel Banner */}
      <div className="relative w-full  h-48  mt-12 md:h-64 bg-gradient-to-r from-blue-400 to-cyan-400 overflow-hidden">
        <img 
          src={channel.channelBanner} 
          alt="Channel Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32  rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-white shadow-lg">
              <img src={avatar} className='rounded-full' />
            </div>
          </div>

          {/* Channel Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {channel.channelName}
                  <span className="ml-2 text-gray-500">•</span>
                </h1>
                <p className="text-gray-600 text-sm mb-1">
                  {id} • {formatSubscribers(subscriberCount)} subscribers • {channel.videos.length} videos
                </p>
                <p className="text-gray-600 text-sm">
                  {channel.description}
                </p>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  {channel.channelName} and 5 more links
                </a>
              </div>

              {/* Subscribe Button */}
              <div className="flex-shrink-0">
                <button onClick={handleSubscribe} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  {isSubscribe ? "UnSubscribe":"Subscirbe"}
                </button>
                {serverError && <div>{serverError}</div>}
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
            {channel.videos.map((video) => (
              
              <div key={video._id} className="group cursor-pointer">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircleOutlineIcon className='w-8 h-8 ' />
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
                      {formatViews(video.views)} • {timeAgo(video.uploadDate)}
                    </p>
                  </div>
                  <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    ...
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