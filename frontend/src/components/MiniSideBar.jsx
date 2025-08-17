import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from "react-router-dom";
const MiniSideBar = () => {

  const location=useLocation()
    
const isWatchPage = location.pathname.startsWith("/watch"); 

  
  const sidebarMainItems = [
          { icon: HomeIcon, label: "Home" },
          { icon: TheatersIcon, label: "Shorts" },
          { icon: SubscriptionsIcon, label: "Subscriptions" },
          {icon:AccountCircleIcon,label:"You"}
      ];
if (isWatchPage) return null;
  return (
   <aside className="fixed left-0 top-14 h-full bg-white dark:bg-gray-900 z-40 w-20 shadow-lg dark:shadow-md dark:shadow-gray-600 hidden lg:block">
      {/* Main Items */}
      <div className="flex flex-col items-center px-2 py-3 space-y-4">
  {sidebarMainItems.map((item, index) => (
    <div key={index} className="flex flex-col justify-center items-center space-y-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2">
      <item.icon className="w-6 h-6 dark:text-white text-gray-700" />
      <span className="text-xs text-center dark:text-white text-gray-700">{item.label}</span>
    </div>
  ))}
</div>
    </aside>
  );
};


export default MiniSideBar