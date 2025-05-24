import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(username, email, password);
      nav("/login"); // redirect to login after signup
    } catch (err) {
      setError("Signup failed. Please check your input.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-8 bg-black rounded-lg shadow-lg space-y-6 text-white"
    >
      <h2 className="text-3xl font-extrabold text-red-600 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full p-3 rounded-md bg-gray-900 border border-red-700 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-red-700 hover:bg-red-800 rounded-md font-semibold transition"
      >
        Sign Up
      </button>
      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}