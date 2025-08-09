import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { toggleSidebar } from '../redux/sidebarslice';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


const Header = () => {
  const isdark = useSelector((state) => state.theme.isdark);
  const dispatch = useDispatch()
  return (
    <header className="fixed top-0 w-full dark:bg-gray-900 bg-white z-50 px-4 py-2 flex items-center justify-between shadow-lg dark:shadow-md dark:shadow-gray-600">
      <div className="flex items-center space-x-4">
        {/* Menu Button */}
        <button className="text-xl cursor-pointer" onClick={() => dispatch(toggleSidebar())}><MenuIcon fontSize="medium" className="text-gray-800 dark:text-white" /></button>
        
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center">
            <YouTubeIcon fontSize='large' className="text-red-500" />

          </div>
          <h2 className="font-roboto dark:text-white">YouTube<sup>IN</sup></h2>
        </div>
      </div>

      {/* Search Bar and Button */}
      <div className="flex-1 max-w-2xl sm:mx-4 ">
        <div className="flex items-center gap-1">
          <div className="flex-1 flex max-sm:gap-0.5">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 dark:text-white border max-sm:hidden border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button className="sm:py-2 ">
              <span className="px-4 max-sm:p-0 text-gray-600 dark:text-white"><SearchIcon fontSize='medium' /></span>
            </button>
          </div>

        </div>
      </div>

      {/* Create Channel & Signin Button */}
      <div className="flex items-center space-x-4">

        <button onClick={() => dispatch(toggleTheme())}>{isdark ? <ToggleOnIcon fontSize='large' className='dark:text-white mx-2' /> : <ToggleOffIcon fontSize='large' color="action" />}</button>
        <button className="hidden md:inline bg-gray-600 text-white px-4 py-1 rounded  transition">
          <AddIcon fontSize='small' className='dark:text-white' /> Create
        </button>
        <button className="bg-blue-500 text-white px-4 py-1  hover:bg-blue-600">Sign In</button>


      </div>
    </header>
  )
}

export default Header