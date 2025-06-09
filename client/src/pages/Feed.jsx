import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaComment, FaHeart, FaShareAlt } from "react-icons/fa";
import { getAllPosts, toggleLike, addComment, deleteComment, deletePostByAdmin } from "../redux/Slices/PostSlice";
import Header from "../component/Header";
import useIsAdmin from "../helpers/checkRole";
import { Link } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("data"));
  //console.log(user);
  const [commentInputs, setCommentInputs] = useState({});



  const isAdmin = useIsAdmin();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleLike = (postId) => {
    dispatch(toggleLike(postId));
  };

  const handleComment = (postId) => {
    const text = commentInputs[postId];
    if (!text) return;
    dispatch(addComment({ postId, text }));
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postData?.length > 0 ? (
          postData.map((post) => {
            const isLiked = post.likes.includes(user._id);
            return (
              <div key={post._id} className="bg-white rounded-xl shadow p-4 space-y-2">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        post?.author?.avatar
                          ? `http://localhost:4500/uploads/${post?.author?.avatar}`
                          : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                      }
                      alt="User Profile"
                      className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div>
                      <div className="font-semibold">
                        {post.author?.fullName}
                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded ml-1">
                          {post.postType?.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                        <span className="text-gray-700">
                          {" "}
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-2 text-lg">{post.content}</div>
                {
                  post.tags.map((tag, index) => (
                    <div key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1 mr-2 mt-2 rounded text-sm">
                      {tag}
                    </div>
                  ))
                }


                <div className="flex gap-6 pt-3 text-gray-600 text-sm">
                  {/* Actions */}
                  {!isAdmin && (
                    <>
                      <span
                        className={`flex items-center gap-1 cursor-pointer ${isLiked ? "text-red-500" : ""
                          }`}
                        onClick={() => handleLike(post._id)}
                      >
                        <FaHeart /> {post.likes?.length ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment /> {post.comments?.length ?? 0}
                      </span>
                      {/* <span className="flex items-center gap-1 cursor-pointer">
                        <FaShareAlt /> Share
                      </span> */}
                      
                      {/* Edit Post Button */}
                      {(post?.author?._id.toString() === user._id) && (
                        <div className="mt-2 space-y-1 text-sm">
                          <div key={post._id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                            <Link to={`/edit/${post._id}`}>
                              <button className="text-green-500 text-xs">
                                Edit
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}

                    </>
                  )}
                  {
                    isAdmin && (
                      <div className="mt-2 space-y-1 text-sm">
                        <div key={post._id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded ">
                          <button
                            onClick={() => dispatch(deletePostByAdmin({ userId: user._id, postId: post._id }))}
                            className="text-red-500  cursor-pointer text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )

                  }
                </div>

                {
                  !isAdmin && (
                    <>
                      {/* Comment Section */}
                      <div className="mt-2">
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Add a comment..."
                          value={commentInputs[post._id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post._id]: e.target.value })
                          }
                        />
                        <button
                          onClick={() => handleComment(post._id)}
                          className="mt-1 text-sm bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Post
                        </button>
                      </div>
                      {/* Display Comments */}
                      <div className="mt-2 space-y-1 text-sm">
                        {post.comments.map(comment => (
                          <div key={comment._id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                            <span>
                              <strong>{comment.user?.fullName || "User"}</strong>: {comment.text}
                            </span>
                            {user?._id === comment.user?._id && (
                              <button
                                onClick={() => dispatch(deleteComment({ postId: post._id, commentId: comment._id }))}
                                className="text-red-500 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )
                }
              </div>
            );
          })
        ) : (
          <p className="col-span-2 text-center">No posts available.</p>
        )}
      </div>
    </>
  );
};

export default Feed;
