import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API = (BACKEND_URL && (isLocalhost || !BACKEND_URL.includes('localhost'))) ? `${BACKEND_URL}/api` : '/api';

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
    try {
      const res = await axios.post(`${API}/admin/login`, { username, password });
      if (typeof res.data === 'string' && res.data.includes('<!DOCTYPE html>')) {
        throw new Error("Server returned HTML instead of JSON. This usually means a routing issue (Hostinger/Apache config).");
      }
      setToken(res.data.token);
    } catch (err) {
      if (err.response && typeof err.response.data === 'string' && err.response.data.includes('<!DOCTYPE html>')) {
        throw new Error("API Route misconfigured: Server returned HTML page.");
      }
      throw err;
    }
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
