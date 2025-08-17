import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import ErrorVideos from './ErrorState'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Comments from './Comments'
import Loading from './Loading'
import formatViews from '../utils/formatViews'
import timeAgo from '../utils/timeAgo'
const WatchVideo = () => {
    const [video,setVideo]=useState(null)
    const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

    const {id}=useParams()

useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:5100/video/${id}`);
                setVideo(response.data.video);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message || "Server error");
                } else if (error.request) {
                    setError("No response from server");
                } else {
                    setError(error.message);
                }
                setVideo(null)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id]) // Fixed: Only depend on id, not video

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (<ErrorVideos 
            message="Error Loading Videos" 
            details="Please check your internet connection or try again later."
        />);
    }



  return (
<>{video && <div className="flex flex-col lg:flex-row max-w-7xl mt-12 mx-auto p-4 gap-6">

      {/* Left: Video + Info + Comments */}
      <div className="flex-1">

        {/* Video Player */}
       <VideoPlayer />

        {/* Video Info */}
        <div className="mt-4 border-b border-gray-300 pb-4">
          <h1 className="text-lg sm:text-xl font-semibold mb-2">
            {video.title}
          </h1>
          <p>{video.description}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-gray-600 text-sm">
            <p>{formatViews(video.views)}• {timeAgo(video.uploadDate)}</p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full">👍{video.likes.length}</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full">👎{video.dislikes.length}</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full">Share</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full">Download</button>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex justify-between items-center mt-4 pb-4 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-medium">{video.channel.channelName}</p>
              <p className="text-xs sm:text-sm text-gray-500">{video.channel.subscribers.length} subscribers</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 sm:px-6 rounded-full">Subscribe</button>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>

          {/* Comment */}
          
<Comments videoId={video._id}/>
          
        </div>
      </div>

      {/* Right: Playlist + Recommended */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">

        {/* Playlist */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Chai aur react | with projects</h2>
          <div className="flex flex-col gap-4">

            {/* Playlist Item */}
            <div className="flex gap-3 bg-white rounded-xl p-2 shadow">
              <div className="w-28 sm:w-36 flex-shrink-0 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">React JS roadmap | chai aur react</p>
                <p className="text-xs text-gray-500">Chai aur Code • 1.1M views</p>
              </div>
            </div>

            <div className="flex gap-3 bg-white rounded-xl p-2 shadow">
              <div className="w-28 sm:w-36 flex-shrink-0 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">React next projects | chai aur react</p>
                <p className="text-xs text-gray-500">Chai aur Code • 987K views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Videos */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recommended</h2>
          <div className="flex flex-col gap-4">

            <div className="flex gap-3">
              <div className="w-28 sm:w-36 flex-shrink-0 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">INDIA’s SMARTEST ENGINEERING STUDENT</p>
                <p className="text-xs text-gray-500">Tanmay Bhat • 1.2M views • 19 hours ago</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-28 sm:w-36 flex-shrink-0 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Japan Jissa SAAF kaise hai !!</p>
                <p className="text-xs text-gray-500">Ajey Nagar • 745K views • 1 week ago</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-28 sm:w-36 flex-shrink-0 h-20 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Why India Built This Impossible Railway</p>
                <p className="text-xs text-gray-500">Larsity • 1.1M views • 4 months ago</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>}</>
 

      )
}

export default WatchVideo
