import React, { useState, useEffect } from "react";
import API from "../api.jsx";
import PostCard from "../components/PostCard.jsx";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    API.get("/myposts").then((res) => setPosts(res.data));
  }, []);

  const deletePost = (id) => {
    API.delete(`/posts/${id}`).then(() =>
      setPosts((prev) => prev.filter((p) => p.id !== id))
    );
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditForm({
      title: post.title,
      content: post.content,
      category: post.category,
    });
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditForm({ title: "", content: "", category: "" });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = (id) => {
    API.put(`/posts/${id}`, editForm).then((res) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
      cancelEditing();
    });
  };

  return (
    <div>
      {posts.map((post) =>
        editingPostId === post.id ? (
          <div
            key={post.id}
            className="border rounded p-4 mb-4 bg-white dark:bg-gray-700"
          >
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              className="w-full border p-2 rounded mb-2 h-24"
            />
            <input
              type="text"
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              className="w-full border p-2 rounded mb-2"
            />
            <button
              onClick={() => saveEdit(post.id)}
              className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <PostCard
            key={post.id}
            post={post}
            onDelete={deletePost}
            onEdit={() => startEditing(post)}
          />
        )
      )}
    </div>
  );
}