import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountModal from "./AccountModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { toggleSidebar } from "../redux/sidebarslice";
import { addSearchText } from "../redux/searchSlice";


const Header = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isdark = useSelector((state) => state.theme.isdark);
  /**Using Redux fetch the detail of Loggin User */
  const avatar = useSelector((state) => state.user.avatar);
  const channel = useSelector((state) => state.user.channel);

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(addSearchText(input));
    setInput("");
    setShowMobileSearch(false);
  };

  return (
    <header className="fixed top-0 w-full dark:bg-gray-900 bg-white z-50 px-4 py-2 flex items-center justify-between shadow-lg dark:shadow-md dark:shadow-gray-600">
      
      {/* Left Section - Sidebar button always visible + Logo */}
      <div className="flex items-center sm:space-x-4">
        <button onClick={() => dispatch(toggleSidebar())}>
          <MenuIcon fontSize="medium" className="text-gray-800 dark:text-white" />
        </button>

        {!showMobileSearch && (
          <div className="flex items-center sm:space-x-1">
            <Link to="/">
              <YouTubeIcon fontSize="large" className="text-red-500" />
            </Link>
            <h2 className="font-roboto dark:text-white">
              YouTube<sup>IN</sup>
            </h2>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-2xl sm:mx-4">
        <div className="flex items-center gap-1">
          {/* Desktop search bar */}
          <input
            type="text"
            value={input}
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 dark:text-white border hidden sm:block border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />

          {/* Mobile toggle: show input if active */}
          {showMobileSearch && (
            <input
              type="text"
              value={input}
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 dark:text-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 sm:hidden"
            />
          )}

          {/* Search button */}
          <button
            onClick={() =>
              window.innerWidth < 640 && !showMobileSearch
                ? setShowMobileSearch(true)
                : handleSearch()
            }
          >
            <SearchIcon fontSize="medium" className="text-gray-600 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      {!showMobileSearch && (
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Theme Toggle */}
          <button onClick={() => dispatch(toggleTheme())}>
            {isdark ? (
              <ToggleOnIcon fontSize="large" className="dark:text-white mx-2" />
            ) : (
              <ToggleOffIcon fontSize="large" color="action" />
            )}
          </button>

          {/* Channel Create Buttons */}
          {!channel && (
            <>
              {/* Desktop button */}
              <Link to="/createChannel" className="hidden sm:block">
                <button className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 transition">
                  <AddIcon fontSize="small" className="mr-1" /> Create
                </button>
              </Link>

              {/* Mobile icon button */}
              <Link to="/createChannel" className="block sm:hidden">
                <button className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition">
                  <AddIcon fontSize="medium" />
                </button>
              </Link>
            </>
          )}

          {/* Profile */}
          {avatar ? (
            <button>
              <img
                src={avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border"
                onClick={() => setOpen(true)}
              />
            </button>
          ) : (
            <Link to="/signin">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 whitespace-nowrap">
                Sign In
              </button>
            </Link>
          )}
          {/* Open Account Bar if user logged in */}
          {open && <AccountModal open={open} setOpen={setOpen} />}
        </div>
      )}
    </header>
  );
};

export default Header;
