import { useParams } from "react-router-dom";
import useChannel from "../utils/useChannel";
import Loading from "./Loading";
import ErrorChannel from "./ErrorState";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddVideo from "./AddVideo";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
const MyChannel = () => {
    const [open, setOpen] = useState(false)
    const [openMenu,setOpenMenu]=useState(null)
    const [reload, setReload] = useState(false)
    const [serverError, setServerError] = useState("");
      const [successDialog, setSuccessDialog] = useState(false);
      const [isEdit,setIsEdit]=useState(false)
      const [selectedVideo,setSelectedVideo]=useState(null)
    const { id } = useParams()
    const avatar = useSelector((state) => state.user.avatar)
    const token=localStorage.getItem("token")
    const { channel, loading, error } = useChannel(id, reload)
    if (loading) {
        return (<Loading />)
    }

    if (error) {
        return (<ErrorChannel   message="Failed to load channel data" 
  details="Server might be down. Please refresh the page."  />)
    }

    if (!channel && !channel.channelName) {
        return <p className='flex justify-center items-center border border-black max-h-20'>No channel found</p>
    }
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


    async function handleDeleteVideo(videoId){
        
        try {
            const response=await axios.delete(`http://localhost:5100/video/${videoId}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })

            if(response.data.response){
                setSuccessDialog(true)
                setTimeout(() => {
            setSuccessDialog(false);
            setReload(!reload)
            navigate(`/myChannel/${id}`);
          }, 1500)
            }
            
        } catch (error) {
            if (error.response?.data?.error) {
          setServerError(error.response.data.error);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
            
        }
    }

    async function  handleEditVideo(video)
     {

        setSelectedVideo(video)
        setIsEdit(!isEdit)
        setOpen(true)
        
    }
    return (
        <div className="min-h-screen mt-12 bg-white">
            {successDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <svg
              className="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-lg font-medium text-gray-700">
              Video Deleted Successfully!
            </p>
            <p className="text-lg font-medium text-gray-700">
              Redirecting to Your Channel Page ......
            </p>
          </div>
        </div>
      )}
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    {/* Avatar */}
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover"
                    />

                    {/* Channel Info */}
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold">{channel.channelName}</h1>
                        <p className="text-gray-400 text-sm sm:text-base">{channel.channelId}</p>
                        <p className="mt-1 text-xs sm:text-sm text-gray-400">
                            More about this channel <span className="text-blue-400">...more</span>
                        </p>

                        {/* Buttons */}
                        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                            <button className="px-3 py-2 bg-gray-500 rounded-full text-xs sm:text-sm font-medium">
                                Customise channel
                            </button>
                            <button
                                onClick={() => setOpen(true)}
                                className="px-3 py-2 bg-gray-500 rounded-full text-xs sm:text-sm font-medium"
                            >
                                Add videos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex gap-6 text-sm font-medium">
                    <button className="py-3 border-b-2 border-white">Playlists</button>
                    <button className="py-3 text-gray-400 hover:text-white">Posts</button>
                </div>
            </div>

            {/*Videos Section */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-lg font-semibold mb-4">Videos</h2>
                 {serverError && (
        <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg max-w-4xl mx-auto">
          {serverError}
        </div>
      )}

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
                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircleOutlineIcon className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="flex justify-between items-start relative">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {formatViews(video.views)} • {timeAgo(video.uploadDate)}
                                    </p>
                                </div>

                                {/* Options Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenu(openMenu === video._id ? null : video._id)}
                                        className="flex-shrink-0 font-bold p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ⋮
                                    </button>

                                    {openMenu === video._id && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
                                            <button
                                              onClick={()=>handleEditVideo(video)}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <EditIcon className="w-5 h-5 dark:bg-white"/> Edit
                                            </button>
                                            <button
                                               onClick={()=>handleDeleteVideo(video._id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                                            >
                                            <DeleteIcon className="w-5 h-5 dark:bg-white"/> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {open && <AddVideo channelId={channel.channelId} isEdit={isEdit} setReload={setReload} setOpen={setOpen} video={selectedVideo} />}
        </div>

    );
}

export default MyChannel