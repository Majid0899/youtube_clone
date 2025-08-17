import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import VideoList from '../components/VideoList'
import FilterButtons from '../components/FilterButtons'
import useVideo from '../utils/useVideo';
import Loading from "../components/Loading"
import NoVideosCard from '../components/NoVideosCard';
import ErrorVideos from '../components/ErrorState';

const Home = () => {
  /**
   * Use custom Hooks useVideo which fetch the videos data using useEffect Hook,
   * useVideo ---- return the videos, loading ,error.
   */
  const { videos, loading, error } = useVideo()
  const [finalVideos, setfinalVideos] = useState(videos)
  /**
   * Using Redux we mantain the state of sidebar
   * Whether it is Open or Close
   * 
   * Using Redux we get the search text from Header
   * To filter the videos based on search Text.
   */
  const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
  const searchText = useSelector((state) => state.search.searchText)
  
  
  

  /**
   * It initialize the finalVideos state
   * if videos.length > 0
   * It runs on change of videos
   */
  useEffect(() => {
    if (videos.length > 0) {
      setfinalVideos(videos)
    }
  }, [videos])

  /**
   * It filter the videos based on the search text
   * It runs on two dependencies videos,searchText
   */
  useEffect(() => {
    if(searchText.trim()===''){
      setfinalVideos(videos)
    }
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setfinalVideos(filtered);

  }, [searchText, videos])

  /** It run the Loading Component initially when the api fetch the data from server */
  if (loading) {
    return (<Loading />)
  }

  /**It run the ErrorState Component  imported as Error Video
   * It run if there is any error occur during Video fetching
   */
  if (error) {
    return (<ErrorVideos message="Error Loading Videos" 
  details="Please check your internet connection or try again later."/>);
  }

  /** It run if No videos Found during Filter Search Or Initially */
  if (videos && finalVideos.length === 0) {
    return (<NoVideosCard videos={videos} setfinalVideos={setfinalVideos} />)
  }

  return (
    <>

      {/* Main Content */}
      <main className={`pt-20 px-4  bg-white transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } dark:bg-gray-900 `}>
        <div className="max-w-7xl mx-auto relative z-30">
          {/* Filter Buttons */}
          <FilterButtons videos={videos} setfinalVideos={setfinalVideos} />
          {/* VideoList */}
          <VideoList videos={finalVideos} />
        </div>
      </main>

    </>
  )
}

export default Home