import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPostById, getSinglePost } from "../redux/Slices/PostSlice";

const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //console.log(postId)

  const { selectedPost } = useSelector((state) => state.posts);
  const [content, setContent] = useState("");
  //console.log(selectedPost);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  const handleEditPost = async () => {
    if (!content.trim()) return;

    await dispatch(editPostById({ postId, content }));
    navigate("/posts"); 
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <textarea
          // placeholder={selectedPost.content}
          className="w-full border rounded p-2 resize-none h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={handleEditPost}
            className="bg-blue-500 text-white px-6 py-1 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-1 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
