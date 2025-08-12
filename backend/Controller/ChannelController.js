import Channel from "../Model/Channel.js";
import User from "../Model/User.js";

async function handleaddChannel(req, res) {
  try {
    const { channelName, description, channelBanner } = req.body;
    // Check for channelname
    if (!channelName || !description || !channelBanner) {
      return res
        .status(400)
        .json({ error: "Channel Name  Description and Banner is required" });
    }

    // Check if user already has a channel with same name
    const existingChannel = await Channel.findOne({ channelName });

    if (existingChannel) {
      return res.status(400).json({ message: "Channel name already exists." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User Not Exist" });
    }
    const channel = new Channel({
      channelName,
      owner: req.user.id,
      description,
      channelBanner,
    });

    await channel.save();
    user.channels.push(channel._id);

    await user.save();

    const response = await Channel.findById(channel._id).populate(
      "owner",
      "username email"
    );

    res
      .status(201)
      .json({ channel: response, message: "Channel Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handlegetChannelDetail(req, res) {
  try {
    //Extract the channel_id
    const channel_id = req.params.id;

    /**
     * Find the channel by id
     * Check Channel is present or Not
     */
    const channel = await Channel.findById(channel_id);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const response = await Channel.findById(channel_id)
      .populate("owner", "username email")
      .populate("videos", "title description thumbnailUrl videoUrl duration").populate('subscribers','username');

    res
      .status(200)
      .json({ channel: response, message: "Channel Fetched Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleSubscriber(req, res) {
  try {
    const channel_id = req.params.id;
    const channel = await Channel.findById(channel_id);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    if(channel.subscribers.includes(req.user.id)){
      channel.subscribers.pull(req.user.id)
    }else{
      channel.subscribers.addToSet(req.user.id)
    }

    await channel.save()
    res.status(200).json({subscribers:channel.subscribers.length})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export { handleaddChannel, handlegetChannelDetail,handleSubscriber };
