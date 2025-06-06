import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../AuthContext";

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  // Fetch token & role reactively whenever login/logout changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setJwtToken(token);
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "admin");
    } else {
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all/Comments");
      setComments(res.data.Comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff} min ago`;
    const hrs = Math.floor(diff / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const handleAddComment = async () => {
    if (!jwtToken) {
      alert("You need to login to comment!");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const decoded = jwtDecode(jwtToken);
      await axios.post(
        "http://localhost:5000/all/addComment",
        {
          comment: newComment,
          id: decoded.id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      await fetchComments();
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/all/delcomment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      await fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-1/4 min-h-fit bg-gray-900 p-4 rounded-lg m-auto relative top-5">
      <h1 className="text-2xl font-bold text-white mb-4">Comments</h1>

      <div className="w-full space-y-3 overflow-y-auto flex-1 mb-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-400">No comments yet.</div>
        ) : (
          comments.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-3 rounded-xl flex flex-col gap-1 relative"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold text-base">
                  {item.username ? item.username.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-white font-medium text-sm">
                    {item.username || "Anonymous"}
                  </h2>
                  <span className="text-xs text-gray-400">
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
              </div>

              <p className="text-gray-200 text-sm mt-1">{item.comment}</p>

              {/* Delete Button - Visible to Admin */}
              {isAdmin && (
                <button
                  onClick={() => handleDeleteComment(item._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
                  title="Delete comment"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Comment Section */}
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
        />
        <button
          onClick={handleAddComment}
          className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}
