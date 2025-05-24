import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.jsx";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("travel");
  const nav = useNavigate();

  const categories = ["travel", "technology", "world", "education", "entertainment"];

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/posts", { title, content, category }).then(() => nav("/"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-black rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Create New Post</h2>

      <input
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 resize-y"
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c} className="bg-gray-900 text-white">
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-red-700 hover:bg-red-800 transition rounded-md text-white font-semibold"
      >
        Create
      </button>
    </form>
  );
}