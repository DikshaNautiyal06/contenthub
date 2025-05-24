import React from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Settings() {
  const { logout } = React.useContext(AuthContext);

  return (
    <div className="max-w-xs mx-auto mt-10">
      <button
        onClick={logout}
        className="w-full px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
}