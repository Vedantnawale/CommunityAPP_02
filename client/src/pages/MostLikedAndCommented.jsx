import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevelopers } from "../redux/Slices/AuthSlice";
import { getAllPosts } from "../redux/Slices/PostSlice";

const MostLikedAndCommented = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllDevelopers());
  }, [dispatch]);

  const { postData } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.usersData);

  if (!postData || postData.length === 0) {
    return <div className="p-4 text-white">No posts available.</div>;
  }

  const topLikedPosts = [...postData]
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 3);

  const topCommentedPosts = [...postData]
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 3);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  };

  const getAvatar = (author) => {
    return author?.avatar
      ? `http://localhost:4500/uploads/${author.avatar}`
      : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';
  };

  const renderPostCard = (post, type = "like") => (
    <div key={post._id} className={`bg-white border-l-4 ${type === "like" ? "border-blue-500" : "border-green-500"} p-4 rounded-xl shadow space-y-3 hover:shadow-lg transition`}>
      <div className="flex items-center gap-3">
        <img
          src={getAvatar(post.author)}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{post.author?.fullName || "Unknown"}</p>
          <p className="text-xs text-gray-500">{formatDateTime(post.createdAt)}</p>
        </div>
        <span className="bg-black text-white text-xs px-2 py-0.5 rounded ml-auto">
          {post.postType?.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-700">{post.content}</p>
      <p className="text-sm">
        <span className="font-semibold">{type === "like" ? "Likes" : "Comments"}:</span>{" "}
        {type === "like" ? post.likes.length : post.comments.length}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {type === "like" && (
        <div className="mt-4">
          <h3 className="font-semibold text-sm">Recent Likes</h3>
          <div className="space-y-2 mt-2">
            {[...post.likes]
              .filter((liked) => userData.some((userId) => userId._id === liked?.toString()))
              .slice(0, 1)
              .map((liked, index) => {
                const matchedUser = userData.find((userId) => userId._id === liked?.toString());
                return (
                  <div key={index} className="bg-gray-100 rounded p-2 border text-sm">
                    <p><strong>{matchedUser?.fullName || "User"}</strong></p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {type === "comment" && (
        <div className="mt-4">
          <h3 className="font-semibold text-sm">Recent Comment</h3>
          <div className="space-y-2 mt-2">
            {[...post.comments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 1)
              .map((comment) => (
                <div key={comment._id} className="bg-gray-100 rounded p-2 border text-sm">
                  <p>
                    <strong>{comment.user?.fullName || "User"}:</strong> {comment.text}
                  </p>
                  <small className="text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top 3 Most Liked */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Top 3 Most Liked Posts</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topLikedPosts.map((post) => renderPostCard(post, "like"))}
          </div>
        </div>

        {/* Top 3 Most Commented */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Top 3 Most Commented Posts</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topCommentedPosts.map((post) => renderPostCard(post, "comment"))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostLikedAndCommented;
