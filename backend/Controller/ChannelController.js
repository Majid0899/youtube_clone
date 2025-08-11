import Channel from "../Model/Channel.js";
import Users from "../Model/User.js";

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

    const resp = await channel.save();

    const user = await Users.findById(req.user.id);
    user.channels.push(channel._id);

    await user.save();

    res.status(201).json({ channel, message: "Channel Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handlegetChannelDetail(req, res) {
  try {
    //Extract the channel_id
    const { channel_id } = req.body;

    /**
     * Find the channel by id
     * Check Channel is present or Not
     */
    const channel = await Channel.findById(channel_id);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    /*Check user is owner of channel or not */
    if (!channel.owner.equals(req.user.id)) {
      return res.status(400).json({ error: "User is not Channel Owner" });
    }

    res.status(200).json({ channel, message: "Channel Fetched Successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleaddChannel, handlegetChannelDetail };
