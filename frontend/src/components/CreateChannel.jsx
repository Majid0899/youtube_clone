import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";

const CreateChannel = () => {
  // Local state for form errors, server errors, and success dialog
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);

  const navigate = useNavigate();

  // Redux state (user data)
  const avatar = useSelector((state) => state.user.avatar);
  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  // Local state for channel form inputs
  const [bannerImage, setBannerImage] = useState(null); // preview image
  const [channelName, setChannelName] = useState("");
  const [channelId, setChannelId] = useState("");       // handle (unique id)
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  /**
   * Handle banner image upload
   * - Create a local preview URL
   * - Store both preview & file for potential upload
   */
  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  /**
   * Reset form inputs and error states
   */
  const handleCancel = () => {
    setBannerImage(null);
    setChannelName("");
    setChannelId("");
    setDescription("");
    setErrors({});
    setServerError("");
  };

  /**
   * Validate form fields
   * - Ensures all required inputs are filled
   */
  const validateFields = () => {
    let tempErrors = {};
    if (!bannerImage) tempErrors.bannerImage = "Please upload a channel banner.";
    if (!channelName.trim()) tempErrors.channelName = "Channel name is required.";
    if (!channelId.trim()) tempErrors.channelId = "Channel handle is required.";
    if (!description.trim()) tempErrors.description = "Description is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Handle create channel submission
   * - Validate inputs
   * - Send POST request to backend
   * - Update Redux store and redirect on success
   */
  const handleCreateChannel = (e) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    if (!validateFields()) return;

    async function sendData() {
      try {
        const response = await axios.post(
          "http://localhost:5100/channel",
          {
            channelId,
            channelName,
            description,
            channelBanner: bannerImage, // 🔹 currently sending preview URL (not actual file)
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass JWT for authentication
            },
          }
        );

        // If channel created successfully
        if (response.data.channel) {
          setSuccessDialog(true);

          // Update user state in Redux (user now has a channel)
          dispatch(
            addUser({
              token,
              avatar,
              username,
              channel: true,
            })
          );

          // Auto-redirect after showing success dialog
          setTimeout(() => {
            setSuccessDialog(false);
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        // Handle backend/server validation errors
        if (error.response?.data?.error) {
          setServerError(error.response.data.error);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      }
    }

    sendData();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-8">
      {/*Success popup dialog */}
      {successDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            {/* Checkmark icon */}
            <svg
              className="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-medium text-gray-700">
              Channel Created Successfully!
            </p>
            <p className="text-lg font-medium text-gray-700">
              Redirecting to Home Page ......
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Your Channel
          </h1>

          {/* User Avatar + Name */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              {username && avatar && (
                <span className="text-white text-sm font-medium">
                  <img src={avatar} alt={username.split(" ")[0]} />
                </span>
              )}
            </div>
            {username && (
              <span className="text-gray-700 font-medium">{username}</span>
            )}
          </div>
        </div>
      </div>

      {/* Server error message */}
      {serverError && (
        <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg max-w-4xl mx-auto">
          {serverError}
        </div>
      )}

      {/* Channel creation form */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200">
          
          {/* Channel Banner Upload Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg">
                <div className="flex flex-col items-center text-white">
                  {/* Upload icon */}
                  <svg
                    className="w-6 h-6 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium dark:text-white">Add Channel Banner</span>
                  <span className="text-xs opacity-80 dark:text-white">2560 x 1440 recommended</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          {errors.bannerImage && (
            <p className="text-red-500 text-sm px-8 mt-2">{errors.bannerImage}</p>
          )}

          <div className="p-8">
            {/* Channel Name */}
            <div className="mb-6">
              <label className=" dark:text-white block text-sm font-medium text-gray-700 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                placeholder="Enter your channel name"
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full dark:text-white dark:font-bold px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.channelName && (
                <p className="text-red-500 text-sm mt-1">{errors.channelName}</p>
              )}
            </div>

            {/* Channel Handle */}
            <div className="mb-6">
              <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">@</span>
                <input
                  type="text"
                  value={channelId}
                  placeholder="channelhandle"
                  onChange={(e) => setChannelId(e.target.value)}
                  className="w-full dark:text-white dark:font-bold pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.channelId && (
                <p className="text-red-500 text-sm mt-1">{errors.channelId}</p>
              )}
            </div>

            {/* Channel Description */}
            <div className="mb-8">
              <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                Channel Description
              </label>
              <textarea
                value={description}
                placeholder="Tell viewers about your channel..."
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full dark:text-white dark:font-bold px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Form Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Create Channel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
