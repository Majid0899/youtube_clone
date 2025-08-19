import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, Link } from "react-router-dom";

const MiniSideBar = () => {
  const location = useLocation();

  /** 
   * Hide the Mini Sidebar when on the "watch" page 
   * Example: /watch/:id
   */
  const isWatchPage = location.pathname.startsWith("/watch");

  // Define items to display in the Mini Sidebar
  const sidebarMainItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: TheatersIcon, label: "Shorts" },
    { icon: SubscriptionsIcon, label: "Subscriptions" },
    { icon: AccountCircleIcon, label: "You" },
  ];

  // If on a watch page, don't render the sidebar
  if (isWatchPage) return null;

  return (
    /**
     * Sidebar container
     * - Fixed to the left
     * - Hidden on small screens (only visible on lg and up)
     * - Supports dark mode
     */
    <aside className="fixed left-0 top-14 h-full bg-white dark:bg-gray-900 z-40 w-20 shadow-lg dark:shadow-md dark:shadow-gray-600 hidden lg:block">
      
      {/* Sidebar main items */}
      <div className="flex flex-col items-center px-2 py-3 space-y-4">
        {sidebarMainItems.map((item, index) => (
          <Link to="/" key={index}>
          <div
            key={index}
            className="flex flex-col justify-center items-center space-y-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          >
            {/* Wrap each item with Link for navigation */}
            
              <item.icon className="w-6 h-6 dark:text-white text-gray-700" />
              <span className="text-xs text-center dark:text-white text-gray-700">
                {item.label}
              </span>
            
          </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default MiniSideBar;
