import Comment from "../Model/Comment.js";
import Video from "../Model/Video.js";

async function handleAddComment(req, res) {
  try {
    const videoId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required!!!" });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }
    const comment = new Comment({
      user: req.user.id,
      text: text,
    });

    const response = await comment.save();

    if (video.comments.includes(comment._id)) {
      return res.status(400).json({ error: "Comment Already Exist!!!" });
    }
    video.comments.push(comment._id);

    await video.save();

    res.status(201).json({ response, message: "Comment Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function handleGetComments(req, res) {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId).populate({
      path: "comments", // first populate the comment IDs 
      populate: {
        path: "user", //  populate the user field inside each comment
        select: "username avatar", // only fetch username and avatar
      },
    });
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }

   const commentsData = video.comments.map(comment => ({
  username: comment.user?.username || "Unknown User",
  avatar: comment.user?.avatar || "/images/default-avatar.png",
  text: comment.text
}));

    res
      .status(200)
      .json({ comments: commentsData, message: "Comments fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



export { handleAddComment, handleGetComments };
