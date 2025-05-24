import React, { useState, useEffect } from "react";
import API from "../api.jsx";
import PostCard from "../components/PostCard.jsx";

const categories = ["travel", "technology", "world", "education", "entertainment"];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [cat, setCat] = useState("");

  useEffect(() => {
    API.get("/posts", { params: { category: cat || undefined } }).then((res) =>
      setPosts(res.data)
    );
  }, [cat]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-black min-h-screen text-white">
      <div className="flex mb-6 space-x-4">
        <select
          className="bg-gray-900 text-white border border-red-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="" className="bg-gray-900 text-white">
            All Categories
          </option>
          {categories.map((c) => (
            <option key={c} value={c} className="bg-gray-900 text-white">
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-red-500 mt-12 text-lg">
          No posts found in this category.
        </p>
      ) : (
        posts.map((p) => <PostCard key={p.id} post={p} />)
      )}
    </div>
  );
}