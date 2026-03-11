import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminAuthContext = createContext(undefined);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("profinoks_admin_token");
  });

  useEffect(() => {
    if (!token) {
      delete axios.defaults.headers.common["Authorization"];
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("profinoks_admin_token");
      }
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("profinoks_admin_token", token);
      }
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/admin/login`, { username, password });
    setToken(res.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAdmin: Boolean(token), token, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
