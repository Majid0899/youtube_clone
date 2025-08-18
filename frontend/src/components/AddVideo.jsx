import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVideo = ({ channelId, setOpen, isEdit, setReload, video }) => {

    /** Defined state to set the formdata */
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    duration: "",
    category: "",
  });


  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //Get the  token from localstorage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // File handlers
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, videoUrl: localUrl }));
  };

  //Thumbnail Handler
  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, thumbnailUrl: localUrl }));
  };

  // Input change
  function handleChange(e) {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  }

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!formdata.title.trim()) newErrors.title = "Title is required";
    if (!formdata.description.trim())
      newErrors.description = "Description is required";
    if (!formdata.thumbnailUrl)
      newErrors.thumbnailUrl = "Thumbnail is required";
    if (!formdata.videoUrl) newErrors.videoUrl = "Video is required";
    if (!formdata.duration.trim()) newErrors.duration = "Duration is required";
    if (!formdata.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** handle the sumbit of Add video and Edit Video */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});
    setServerError("");
    setSuccessMessage("");
    let response = null;
    try {
      if (isEdit && video._id) {
        response = await axios.put(
          `http://localhost:5100/video/${video._id}`,
          { ...formdata },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5100/video",
          {
            ...formdata,
            channelId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setSuccessMessage(`${response.data.message} Redirecting...`);
      setFormData({
        title: "",
        description: "",
        thumbnailUrl: "",
        videoUrl: "",
        duration: "",
        category: "",
      });
      setTimeout(() => {
        setOpen(false);
        navigate(`/mychannel/${channelId}`);
        setReload((prev) => !prev);
      }, 1000);
    } catch (error) {
      if (error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected Server Error Occured");
      }
    }
  }

  //It ensure that if isEdit true form feilds are filled with the existing video data
  useEffect(() => {
    if (isEdit && video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
        thumbnailUrl: video.thumbnailUrl || "",
        videoUrl: video.videoUrl || "",
        duration: video.duration || "",
        category: video.category || "",
      });
    }
  }, [isEdit, video]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 max-sm:mx-2 rounded-xl w-full max-w-lg shadow-lg overflow-y-auto scrollbar-custom max-h-[90vh]">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-2 text-green-800 bg-green-200 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Server Error Message */}
        {serverError && (
          <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg">
            {serverError}
          </div>
        )}
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">
            {isEdit ? "Edit Video" : "Add New Video"}
          </h2>
          <button onClick={() => setOpen(false)}>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form className="p-4 space-y-4 " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
            value={formdata.title}
            name="title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <textarea
            placeholder="Description"
            rows="3"
            name="description"
            onChange={handleChange}
            value={formdata.description}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          {/* Thumbnail Upload */}
          <label className="block w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white cursor-pointer text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-sm">
              {formdata.thumbnailUrl
                ? "Thumbnail Selected"
                : "Upload Thumbnail"}
            </span>
            <input
              type="file"
              accept="image/*"
              name="thumbnailFile"
              onChange={handleThumbnailSelect}
              className="hidden"
            />
          </label>
          {errors.thumbnailUrl && (
            <p className="text-red-500 text-sm">{errors.thumbnailUrl}</p>
          )}

          {/* Video Upload */}
          <label className="block w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white cursor-pointer text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-sm">
              {formdata.videoUrl ? "Video Selected" : "Upload Video"}
            </span>
            <input
              type="file"
              accept="video/*"
              name="videoFile"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          {errors.videoUrl && (
            <p className="text-red-500 text-sm">{errors.videoUrl}</p>
          )}
          {/* Duration */}
          <input
            type="text"
            placeholder="Duration (e.g. 12:30)"
            name="duration"
            value={formdata.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={formdata.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursorounded-lg shadow cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
