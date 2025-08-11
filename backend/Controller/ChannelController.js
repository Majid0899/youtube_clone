import Channel from "../Model/Channel.js";
import User from "../Model/User.js";


async function handleaddChannel(req, res) {
  try {
    const { channelName, description, channelBanner } = req.body;
    // Check for channelname
    if (!channelName) {
      return res.status(400).json({ error: "Channel Name is required" });
    }

    // Check if user already has a channel with same name
    const existingChannel = await Channel.findOne({ channelName });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel name already exists." });
    }

    const channel = new Channel({
      channelName,
      owner: req.user.id,
      description,
      channelBanner,
      subscribers: 0,
      videos: [],
    });

    await channel.save();

    
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({error:"User Not Exist"})
    }
    user.channels.push(channel._id);

    await user.save();

    const response=await Channel.findById(channel._id).populate('owner','name email')


    res.status(201).json({ channel:response, message: "Channel Added Successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handlegetChannelDetail(req, res) {
  try {
    //Extract the channel_id
    const  channel_id  = req.params.id;

    /**
     * Find the channel by id
     * Check Channel is present or Not
     */
    const channel = await Channel.findById(channel_id);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
  
    const response=await Channel.findById(channel_id).populate('owner','name email').populate('videos','title description thumbnailUrl videoUrl duration')

    res.status(200).json({ channel:response, message: "Channel Fetched Successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleaddChannel, handlegetChannelDetail };
