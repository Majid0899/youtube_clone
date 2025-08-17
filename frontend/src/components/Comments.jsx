import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import ErrorComment from "./ErrorState";

const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const avatar = useSelector((state) => state.user.avatar);
    const username = useSelector((state) => state.user.username)
    const token = localStorage.getItem("token");
    const [editingComment, setEditingComment] = useState(null);


    // fetch comments
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
                    setError(error.response.data.error || "Server error");
                } else if (error.request) {
                    setError("No response from server");
                } else {
                    setError(error.message);
                }
                setComments([]);
            } finally {
                setLoading(false);
            }
        };

        if (videoId) fetchData();
    }, [videoId]);

    if (loading) return <Loading />;
    if (error)
        return (
            <ErrorComment
                message="Error Loading Comments"
                details={error} // show actual error
            />
        );


    // handle adding a comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        if (!videoId) {
            setError("No video ID available");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5100/comment/${videoId}`,
                { text: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newCommentData = {
                ...response.data.comment,
                avatar: avatar,
                username: username
            };
            // update comments list instantly
            setComments([newCommentData, ...comments]);
            setNewComment(""); // clear input
            setError(null); // clear any previous errors
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "Server error");
            } else if (error.request) {
                setError("No response from server");
            } else {
                setError(error.message);
            }
        }
    };

    const handleEditComment = async (commentId, newText) => {
        if (!newText.trim()) {
            setError("Comment cannot be empty");
            return;
        }
        if (!commentId) {
            setError("No comment ID available");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:5100/comment/${commentId}`,
                { text: newText },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedComment = response.data.comment; // 👈 adjust to match backend

            setComments(
                comments.map(c =>
                    c.commentId === commentId ? { ...c, text: updatedComment.text } : c
                )
            );
        } catch (error) {
            setError("Failed to edit comment");
        }
    };


    const handleDeleteComment = async (commentId) => {
         if (!commentId) {
            setError("No comment ID available");
            return;
        }
        try {
            await axios.delete(`http://localhost:5100/comment/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComments(comments.filter(c => c.commentId !== commentId));
        } catch (error) {
            setError("Failed to delete comment");
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
                    value={newComment} // 👈 make it controlled so it resets
                    placeholder="Add a comment..."
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment();
                    }}
                    className="flex-1 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none dark:text-white"
                />
            </div>

            {/* Show add-comment error if any */}
            {error && (
                <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

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
