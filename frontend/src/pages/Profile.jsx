import React from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Profile() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto bg-black text-white rounded-lg shadow-lg p-8 mt-10">
      <h2 className="text-3xl font-extrabold text-red-600 mb-6">Profile</h2>
      <div className="text-lg">
        <p className="mb-4">
          <strong className="text-red-500">Username:</strong> {user?.username || "N/A"}
        </p>
      </div>
    </div>
  );
}