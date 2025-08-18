import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import ErrorComment from "./ErrorState";

const Comments = ({ videoId }) => {
   // State for comments list
  const [comments, setComments] = useState([]);
  // Loading state while fetching
  const [loading, setLoading] = useState(true);
  // Local error state (e.g., empty comment, no id)
  const [error, setError] = useState(null);
  // Fetch error for initial load
  const [fetchError, setFetchError] = useState(null);
  // Server error (API responses)
  const [serverError, setServerError] = useState("");
  // New comment input
  const [newComment, setNewComment] = useState("");
  // Redux state (current logged-in user info)
  const avatar = useSelector((state) => state.user.avatar);
  const username = useSelector((state) => state.user.username);
  // Auth token from localStorage
  const token = localStorage.getItem("token");
  // Track which comment is being edited
  const [editingComment, setEditingComment] = useState(null);

  // Fetch comments on mount (or when videoId changes)
  useEffect(() => {
    const fetchData = async () => {
      if (!videoId) {
        setError("No video ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5100/comment/${videoId}`
        );
        setComments(response.data.comments || []);
      } catch (error) {
        if (error.response) {
          setFetchError(error.response.data.error || "Server error");
        } else if (error.request) {
          setFetchError("No response from server");
        } else {
          setFetchError(error.message);
        }
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) fetchData();
  }, [videoId]);

   // Loading state
  if (loading) return <Loading />;
  // Error while fetching comments
  if (fetchError)
    return (
      <ErrorComment
        message="Error Loading Comments"
        details={error} // show actual error
      />
    );

  /**
   * Add a new comment
   */
  const handleAddComment = async () => {

    //Handle client side error
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }


    if (!videoId) {
      setError("No video ID available");
      return;
    }

    try {
      //api calling
      const response = await axios.post(
        `http://localhost:5100/comment/${videoId}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //formatting a data to add comment
      const newCommentData = {
        ...response.data.comment,
        avatar: avatar,
        username: username,
      };
      // update comments list instantly
      setComments([newCommentData, ...comments]);
      setNewComment(""); // clear input
      setError(null); // clear any previous errors
    } catch (error) {
      setNewComment("")
      //set the servererror
      if (error.response) {
        setServerError(error.response.data.error || "Server error");
      } else if (error.request) {
        setServerError("No response from server");
      } else {
        setServerError(error.message);
      }
    }
  };

  /**
   * Edit a comment
   */
  const handleEditComment = async (commentId, newText) => {
    //Handle client side error
    if (!newText.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    if (!commentId) {
      setError("No comment ID available");
      return;
    }
    try {
      //api calling
      const response = await axios.put(
        `http://localhost:5100/comment/${commentId}`,
        { text: newText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedComment = response.data.comment; 

      //update the comment state.
      setComments(
        comments.map((c) =>
          c.commentId === commentId ? { ...c, text: updatedComment.text } : c
        )
      );
    } catch (error) {

      //set serverError
      if (error.response) {
        setServerError(error.response.data.error || "Server error");
      } else if (error.request) {
        setServerError("No response from server");
      } else {
        setServerError(error.message);
      }
    }
  };

  /**
   * Delete a Comment
   */
  const handleDeleteComment = async (commentId) => {
    //hanlde client side error
    if (!commentId) {
      setError("No comment ID available");
      return;
    }
    try {
      //api calling
      await axios.delete(`http://localhost:5100/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //update the comments state
      setComments(comments.filter((c) => c.commentId !== commentId));
    } catch (error) {
      //set servererror
      if (error.response) {
        setServerError(error.response.data.error || "Server error");
      } else if (error.request) {
        setServerError("No response from server");
      } else {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold dark:text-white mb-3">
        {comments.length} Comments
      </h3>

      {/* Add Comment Input */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src={avatar || "/default-avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          value={newComment} 
          placeholder="Add a comment..."
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
          className="flex-1 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none dark:text-white"
        />
      </div>

      {/* Server Error Message */}
      {serverError && (
        <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg">
          {serverError}
        </div>
      )}
      {/* Show add-comment error if any */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Render Comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="flex gap-3">
              <img
                src={comment.avatar || "/default-avatar.png"}
                alt={comment.username || "user"}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white flex items-center justify-between">
                  {comment.username || "Anonymous"}

                  {/* Show edit/delete only for logged-in user */}
                  {comment.username === username && (
                    <span className="flex gap-2 text-xs text-blue-500">
                      <button
                        onClick={() => setEditingComment(comment.commentId)}
                        className="hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </span>
                  )}
                </p>

                {/* If editing this comment */}
                {editingComment === comment.commentId ? (
                  <input
                    type="text"
                    autoFocus
                    defaultValue={comment.text}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditComment(comment.commentId, e.target.value);
                        setEditingComment(null);
                      }
                    }}
                    className="w-full border-b border-gray-400 bg-transparent text-sm dark:text-white focus:outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {comment.text}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
