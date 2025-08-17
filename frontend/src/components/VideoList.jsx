import { useSelector } from 'react-redux'
import VideoCard from './VideoCard'


const VideoList = ({videos}) => {
  /**
   * Using Redux we mantain the state of sidebar
   * Whether it is Open or Close*/
  const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)

  return (

    /**It update the grid based on the sidebar status */
    <div className="min-h-screen bg-white dark:bg-gray-900">
    <div className={`grid gap-4  ${sidebarOpen
      ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      } `}>
      {/* Render the Videocard Component  */}
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
    </div>
  );
};


export default VideoList
