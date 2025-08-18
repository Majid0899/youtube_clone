import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Importing Material UI icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TheatersIcon from '@mui/icons-material/Theaters';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SchoolIcon from '@mui/icons-material/School';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArticleIcon from '@mui/icons-material/Article';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';

import SideBarFooter from './SideBarFooter';

const SideBar = () => {
    /**
     * Get the sidebar open/close state from Redux store
     */
    const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)

    /**
     * Sidebar item groups
     * Each group is an array of objects with { icon, label }
     */
    const sidebarMainItems = [
        { icon: HomeIcon, label: "Home" },
        { icon: TheatersIcon, label: "Shorts" },
        { icon: SubscriptionsIcon, label: "Subscriptions" },
    ];

    const sidebarYouItems = [
        { icon: AccountCircleIcon, label: "You" },
        { icon: HistoryIcon, label: "History" },
        { icon: PlaylistPlayIcon, label: "Playlist" },
        { icon: VideoLibraryIcon, label: "Your Videos" },
        { icon: SchoolIcon, label: "Your Courses" },
        { icon: WatchLaterIcon, label: "Watch Later" },
        { icon: ThumbUpAltIcon, label: "Liked Videos" },
    ];

    const sidebarExploreItems = [
        { icon: ShoppingBagIcon, label: "Shopping" },
        { icon: MusicNoteIcon, label: "Music" },
        { icon: MovieIcon, label: "Films" },
        { icon: LiveTvIcon, label: "Live" },
        { icon: SportsEsportsIcon, label: "Gaming" },
        { icon: ArticleIcon, label: "News" },
        { icon: SportsSoccerIcon, label: "Sports" },
        { icon: SchoolIcon, label: "Courses" },
        { icon: CheckroomIcon, label: "Fashion and Beauty" },
        { icon: PodcastsIcon, label: "Podcast" },
    ];

    const sidebarSettingsItems = [
        { icon: SettingsIcon, label: "Settings" },
        { icon: FlagIcon, label: "Report" },
        { icon: HistoryIcon, label: "History" },
        { icon: HelpOutlineIcon, label: "Help" },
        { icon: FeedbackIcon, label: "Send Feedback" },
    ];

    return (
        /**
         * Sidebar container
         * - Fixed on the left
         * - Transitions in/out based on `sidebarOpen`
         * - Supports dark mode
         */
        <aside className={`fixed left-0 top-12 h-full bg-white z-40 dark:bg-gray-900 
            transition-transform duration-300 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            w-64 overflow-y-auto shadow-lg dark:shadow-md dark:shadow-gray-600`}
        >
            <div className="p-4">
                {/* --- Main Items Section --- */}
                <nav>
                    <ul className="space-y-1">
                        {sidebarMainItems.map((item, index) => (
                            <li key={index}>
                                <div className={`flex items-center space-x-3 px-3 py-2 
                                    rounded-lg cursor-pointer hover:bg-gray-600 ${item.active ? 'bg-gray-100' : ''}`}
                                >
                                    {/* Wrap with Link for navigation */}
                                    <Link to="/">
                                        <item.icon className="w-5 h-5 dark:text-white" />
                                        <span className="text-sm dark:text-white">{item.label}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-1 my-1"></div>

                {/* --- You Section --- */}
                <nav>
                    <ul className="space-y-1">
                        {sidebarYouItems.map((item, index) => (
                            <li key={index}>
                                <div className={`flex items-center space-x-3 px-3 py-2 
                                    rounded-lg cursor-pointer hover:bg-gray-600 ${item.active ? 'bg-gray-100' : ''}`}
                                >
                                    <item.icon className="w-5 h-5 dark:text-white" />
                                    <span className="text-sm dark:text-white">{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-1 my-1"></div>

                {/* --- Explore Section --- */}
                <div className="px-4 py-2">
                    <span className="dark:text-white font-medium">Explore</span>
                </div>
                <nav>
                    <ul className="space-y-1">
                        {sidebarExploreItems.map((item, index) => (
                            <li key={index}>
                                <div className={`flex items-center space-x-3 px-3 py-2 
                                    rounded-lg cursor-pointer hover:bg-gray-600 ${item.active ? 'bg-gray-100' : ''}`}
                                >
                                    <item.icon className="w-5 h-5 dark:text-white" />
                                    <span className="text-sm dark:text-white">{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-1 my-1"></div>

                {/* --- Settings Section --- */}
                <nav>
                    <ul className="space-y-1">
                        {sidebarSettingsItems.map((item, index) => (
                            <li key={index}>
                                <div className={`flex items-center space-x-3 px-3 py-2 
                                    rounded-lg cursor-pointer hover:bg-gray-600 ${item.active ? 'bg-gray-100' : ''}`}
                                >
                                    <item.icon className="w-5 h-5 dark:text-white" />
                                    <span className="text-sm dark:text-white">{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-1 my-1"></div>

                {/* --- Footer Section --- */}
                <SideBarFooter />
            </div>
        </aside>
    )
}

export default SideBar
