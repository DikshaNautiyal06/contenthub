
import React, { createContext, useState } from "react";
import API from "../api.jsx";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

const login = async (username, password) => {
  try {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await API.post("/auth/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser({ username });
    return response.data;
  } catch (error) {
    console.error("Login failed", error.response || error);
    throw error;
  }
};
  const signup = async (username, email, password) => {
    try {
      const response = await API.post("/auth/register", { username, email, password });
      return response.data;
    } catch (error) {
      console.error("Signup failed", error.response || error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}