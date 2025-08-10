import React from 'react'

import { useSelector} from 'react-redux'
import VideoList from '../components/VideoList'
import FilterButtons from '../components/FilterButtons'

const Home = () => {
    const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
 
 

  return (
    <>
   
      {/* Main Content */}
      <main className={`pt-20 px-4  bg-white transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } dark:bg-gray-900 `}>
        <div className="max-w-7xl mx-auto relative z-30">
          {/* Filter Buttons */}
          <FilterButtons />
          {/* VideoList */}
          <VideoList />
        </div>
      </main>
   
    </>
    )
}

export default Home