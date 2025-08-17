import Video from "../Model/Video.js";
import Channel from "../Model/Channel.js";

async function handleAddVideo(req, res) {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      duration,
      channelId,
      category,
    } = req.body;


    if(!title || !description  || !thumbnailUrl || !videoUrl || !duration || !category || !channelId){
      return res.json({error:"title,description,thumbnailUrl videoUrl category duration channelId are required "})
    }

    const channel = await Channel.findOne({channelId:channelId});
    if (!channel) {
      return res.status(404).json({ error: "Channel Not Found" });
    }

    if (!channel.owner.equals(req.user.id)) {
      return res.status(400).json({
        error: "You are not Authorized to Add Video in Other Channel",
      });
    }
    /**Create a new video */
    const video = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      duration,
      channel: channel._id,
      uploader: req.user.id,
      category,
    });

    await video.save();

    channel.videos.push(video._id);
    await channel.save();

    const response = await Video.findById(video._id)
      .populate("channel", "channelId channelName  subscriber")
      .populate("uploader", "username email");

    res
      .status(201)
      .json({ video: response, message: "Video Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function handleGetVideo(req,res){
  try {
    const id=req.params.id;
    const video = await Video.findById(id)
      .populate("channel", "channelId channelName subscribers")
      .populate("uploader", "username email")
      .populate("likes", "username")
      .populate("dislikes", "username")
    res.status(200).json({ video, message: "Video Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function handleGetVideos(req, res) {
  try {
    const videos = await Video.find()
      .populate("channel", "channelId channelName subscribers")
      .populate("uploader", "username email")
      .populate("likes", "username")
      .populate("dislikes", "username")
    res.status(200).json({ videos, message: "Video Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function handleLikes(req, res) {
  try {
    const videoId = req.params.id;

    //Check video is exist or not
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }

    if (video.likes.includes(req.user.id)) {
      video.likes.pull(req.user.id);
    } else {
      video.likes.addToSet(req.user.id);
      video.dislikes.pull(req.user.id);
    }

    await video.save();

    res.status(200).json({ likes: video.likes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function handleDislikes(req, res) {
  try {
    const videoId = req.params.id;

    //Check video is exist or not
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }

    if (video.dislikes.includes(req.user.id)) {
      video.dislikes.pull(req.user.id);
    } else {
      video.dislikes.addToSet(req.user.id);
      video.likes.pull(req.user.id);
    }

    await video.save();

    res.status(200).json({ dislikes: video.dislikes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function handleUpdateVideo(req, res) {
  try {
    const videoId = req.params.id;
    const data = req.body;

    //Check Video exist or not
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }

    //
    if (!video.uploader._id.equals(req.user.id)) {
      return res.status(400).json({ error: "User is Not Authenticated" });
    }

    const response = await Video.findByIdAndUpdate(videoId, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({response,message:"Updated Succesfull"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function handleDeleteVideo(req, res) {
  try {
    const videoId = req.params.id;

    //Check Video exist or not
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }

    //Check Ownership of video
    if (!video.uploader._id.equals(req.user.id)) {
      return res.status(400).json({ error: "User is Not Authenticated" });
    }

    const response = await Video.findByIdAndDelete(videoId);

    res.status(200).json({ response, message: "Video Deleted Succesfull" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export {
  handleAddVideo,
  handleUpdateVideo,
  handleDeleteVideo,
  handleGetVideos,
  handleLikes,
  handleDislikes,
  handleGetVideo
};
