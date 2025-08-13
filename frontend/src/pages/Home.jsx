import React,{useState,useEffect}from 'react'

import { useSelector} from 'react-redux'
import VideoList from '../components/VideoList'
import FilterButtons from '../components/FilterButtons'
import useVideo from '../utils/useVideo';
import Loading from "../components/Loading"
import NoVideosCard from '../components/NoVideosCard';

const Home = () => {
    const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
    
 const { videos, loading, error } = useVideo()
 const [finalVideos, setfinalVideos] = useState(videos)
 

 useEffect(()=>{
  if(videos.length>0){
    setfinalVideos(videos)
  }
 },[videos])


   if (loading) {
     return (<Loading />)
   }
 
   if (error) {
     return <p>Error loading videos: {error}</p>;
   }
 
   if (finalVideos.length === 0) {
     return (<NoVideosCard videos={videos} setfinalVideos={setfinalVideos}/>)
   }

  return (
    <>
   
      {/* Main Content */}
      <main className={`pt-20 px-4  bg-white transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } dark:bg-gray-900 `}>
        <div className="max-w-7xl mx-auto relative z-30">
          {/* Filter Buttons */}
          <FilterButtons videos={finalVideos} setfinalVideos={setfinalVideos} />
          {/* VideoList */}
          <VideoList videos={finalVideos} />
        </div>
      </main>
   
    </>
    )
}

export default Home