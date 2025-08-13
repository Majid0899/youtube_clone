import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {

 const [errors, setErrors] = useState({});
   const [serverError, setServerError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const navigate=useNavigate()

  const avatar=useSelector((state)=>state.user.avatar)
  const username=useSelector((state)=>state.user.username)
 
  const token=useSelector((state)=>state.user.token)

  const [bannerImage, setBannerImage] = useState(null);
  const [channelName,setChannelName]=useState("")
  const [channelId,setChannelId]=useState("")
  const [description,setDescription]=useState("")


  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  }

  const handleCancel=()=>{
    setBannerImage(null)
    setChannelName("")
    setChannelId("")
    setDescription("")
  }

  const handleCreateChannel=(e)=>{
   

    
    async function sendData() {
      try {
        const response=await axios.post("http://localhost:5100/channel",{
          channelId:channelId,
          channelName:channelName,
          description:description,
          channelBanner:bannerImage
        },{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        console.log(response.data)
        if(response.data.channel){
          setSuccessMessage(`${response.data.message} redirecting ....`);
          setTimeout(()=>{
            navigate('/')
          },[1000])
        }
        
      } catch (error) {
        if(error.response?.data?.error){
          setServerError(error.response.data.error)
        }else{
          setServerError("An unexpected error occurred. Please try again.")
        }
        
      }
      
    }
    sendData()
    setBannerImage(null)
    setChannelName("")
    setChannelId("")
    setDescription("")
    
    
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-8">
      {/* <!-- Header with logged in user --> */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Channel</h1>
          <div className="flex items-center space-x-3">
            <div className="w-14 h-12 bg-blue-500 rounded-full flex items-center justify-center">
             {username && <span className="text-white text-sm font-medium">{username.split(" ")[0]}</span>} 
            </div>
            {username && <span className="text-gray-700 font-medium">{username}</span>}
          </div>
        </div>
      </div>
      {successMessage && (
          <div className="mb-4 p-2 text-green-800 bg-green-200 rounded-lg">{successMessage}</div>
        )}

        {serverError && (
          <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg">{serverError}</div>
        )}

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* <!-- Channel Banner Section --> */}
          <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="cursor-pointer bg-black bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg">
                <div className="flex flex-col items-center text-white">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm font-medium">Add Channel Banner</span>
                  <span className="text-xs opacity-80">2560 x 1440 recommended</span>
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

          <div className="p-8">
            {/* <!-- Profile Picture and Basic Info --> */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
              {/* <!-- Profile Picture --> */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      {(avatar && username) && <span className="text-white text-lg font-medium"><img src={avatar} alt={username[0]} /></span>}
                    </div>
                  </div>
                </div>
                <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <input type="file" accept="image/*" className="hidden" id="profile-upload" />
                </label>
              </div>

              {/* <!-- Channel Name --> */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Name
                </label>
                <input
                  type="text"
                  name="channelName"
                  value={channelName}
                  placeholder="Enter your channel name"
                  onChange={(e)=>setChannelName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* <!-- Channel Handle --> */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">@</span>
                <input
                  type="text"
                  name="handle"
                  value={channelId}
                  placeholder="channelhandle"
                  onChange={(e)=>setChannelId(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Your handle is how people will find and mention your channel
              </p>
            </div>

            {/* <!-- Channel Description --> */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Description
              </label>
              <textarea
                name="description"
                value={description}
                placeholder="Tell viewers about your channel. A good description helps people discover your content."
                rows="4"
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                0/1000 characters
              </p>
            </div>

            {/* <!-- Terms and Privacy --> */}
            <div className="mb-8">
              <p className="text-xs text-gray-500 leading-relaxed">
                By clicking Create Channel, you agree to YouTube's Terms of Service. Changes made to your name and
                profile picture are visible only on YouTube and not other Google services.
                <a href="#" className="text-blue-600 hover:underline">Learn more</a>
              </p>
            </div>

            {/* <!-- Action Buttons --> */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button onClick={handleCancel}className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleCreateChannel}className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Create Channel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateChannel;