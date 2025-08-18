import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ErrorState from './ErrorState'; //
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

function AccountModal({ setOpen }) {
  // Local state
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * Fetch user profile on mount
   */
  useEffect(() => {
    const token = localStorage.getItem("token");

    async function getUser() {
      try {
        const response = await axios.get("http://localhost:5100/user/profile", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data.user)

      } catch (error) {
        // Different error cases
        if (error.response) {
          setError(error.response.data.error || "Server error");
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError(error.message);
        }
        setUser([])
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

 

  // Show error screen
  if (error) {
    return <ErrorState message="Failed to load account details" details={error} />
  }

  /**
   * Handle Signout
   */
  function handleSignout() {
    localStorage.clear()
    dispatch(addUser({
      avatar: "",
      username: "",
      channel: false,
      token: ""
    }))
    setTimeout(() => {
      setOpen(false)
    }, 1000)
    navigate("/")
  }

  return (
    <>{!loading && <div className="relative">
      {/* Fullscreen Modal */}
      <div className="fixed inset-0 top-12 bg-black/50 flex justify-end z-50">
        <div className="dark:bg-zinc-900 bg-white dark:text-white text-gray-900 w-80 rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-700">
            <div>
              <p className="font-semibold">{user.username}</p>
              {user.channels.map((channel) => (
                <Link to={`myChannel/${channel.channelId}`} key={channel._id}>
                  <p className="text-sm text-zinc-400">{channel.channelId}</p>
                </Link>
              ))}
            </div>
            <button onClick={() => setOpen(false)}>
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Body - Action Buttons */}
          <div className="p-2 divide-zinc-700">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Google Account</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Switch account</button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-500"
              onClick={handleSignout}
            >
              Sign out
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">YouTube Studio</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Purchases and memberships</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Your data in YouTube</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Appearance: Device theme</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Language: British English</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Restricted Mode: Off</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Location: India</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-500">Keyboard shortcuts</button>
          </div>
        </div>
      </div>
    </div>}</>
    
    
  );
}

export default AccountModal;
