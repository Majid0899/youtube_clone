import Comment from "../Model/Comment.js";
import Video from "../Model/Video.js";

async function handleAddComment(req, res) {
  try {
    const videoId = req.params.id;
    const { text } = req.body;

    if (!videoId || videoId === 'undefined') {
      return res.status(400).json({ error: "Valid Video ID is required" });
    }

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

    const commentWithUser = await Comment.findById(response._id).populate('user', 'username avatar');
    
      const commentData = {
      commentId: commentWithUser._id,
      username: commentWithUser.user?.username || "Unknown User",
      avatar: commentWithUser.user?.avatar || "/images/default-avatar.png",
      text: commentWithUser.text
    };

    res.status(201).json({ comment:commentData, message: "Comment Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function handleGetComments(req, res) {
  try {
    const videoId = req.params.id;

    if (!videoId || videoId === 'undefined') {
      return res.status(400).json({ error: "Valid Video ID is required" });
    }
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
  commentId:comment._id,
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

async function handleEditComment(req,res) {
  try {
    const commentId=req.params.id;
    const {text}=req.body;
    if (!commentId || commentId === 'undefined') {
      return res.status(400).json({ error: "Valid Comment ID is required" });
    }
    const comment=await Comment.findById(commentId).populate('user','username avatar')
    if(!comment){
      return res.status(404).json({error:"Comment not found!!!"})
    }
     if (!comment.user._id.equals(req.user.id)) {
      return res.status(403).json({ error: "You are not Authorized to edit comments of Other Person" });
    }

    const response=await Comment.findByIdAndUpdate(commentId,{text},{
      new:true,
      runValidators:true,
    })
    const commentsData = {
      commentId: response._id,
      username: comment.user?.username || 'Unknown',
      avatar: comment.user?.avatar || "/images/default-avatar.png",
      text: response.text
    };


    res.status(200).json({comment:commentsData,message:"Comment Updated"})

    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  
}

async function handleDeleteComment(req,res) {
  try {
    const commentId=req.params.id;
    const comment=await Comment.findById(commentId)
    if (!commentId || commentId === 'undefined') {
      return res.status(400).json({ error: "Valid Comment ID is required" });
    }
    if(!comment){
      return res.status(404).json({error:"comment not found!!!"})
    }
    if(!comment.user.equals(req.user.id)){
      return res.status(400).json({error:"You are not Authorized to delete comments of Other Person"})
    }

    const response=await Comment.findByIdAndDelete(commentId)

     await Video.updateOne(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({response,message:"comment Deleted"})
    
  }  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  
}

export { handleAddComment, handleGetComments,handleEditComment,handleDeleteComment};


