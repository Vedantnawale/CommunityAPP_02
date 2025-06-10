import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewPost, getAllPosts } from "../redux/Slices/PostSlice";

const CreatePost = () => {
  const [postType, setPostType] = useState("update");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (!content.trim()) return;
    const data = {
      content,
      postType,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    await dispatch(createNewPost(data));
    setContent("");
    setTags("");
    dispatch(getAllPosts());
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setPostType("update")}
            className={`px-4 py-1 rounded border ${postType === "update" ? "bg-black text-white" : ""}`}
          >
            Update
          </button>
          <button
            onClick={() => setPostType("question")}
            className={`px-4 py-1 rounded border ${postType === "question" ? "bg-black text-white" : ""}`}
          >
            Question
          </button>
        </div>

        <textarea
          placeholder="Share an update..."
          className="w-full border rounded p-2 resize-none h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full border rounded p-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Post
        </button>

      </div>
    </div>
  );
};

export default CreatePost;
