import React from "react";
import Header from "./components/Header";
import { useSelector, useDispatch } from 'react-redux'
import SideBar from "./components/SideBar";
import VideoList from "./components/VideoList";
import FilterButtons from "./components/FilterButtons";
import MiniSideBar from "./components/MiniSideBar";
import { toggleSidebar } from "./redux/sidebarslice";



export default function App() {
  const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
  const isdark = useSelector((state) => state.theme.isdark);
  const dispatch = useDispatch()

  return (
    <div className={`${isdark ? "dark" : ""} scrollbar-custom min-h-screen bg-gray-50`}>
      {/* Header */}
      <Header />
      {/* Sidebar If Open SideBar render else MiniSideBar */}
      {sidebarOpen ? <SideBar /> : <MiniSideBar />}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed top-16 left-64 right-0 bottom-0  bg-opacity-50 z-20 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

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
    </div>
  );
};
