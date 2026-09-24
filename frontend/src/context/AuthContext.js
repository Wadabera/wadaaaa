import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, clearToken, getToken, setToken } from "../api/client";
import { authEndpoints, ENABLE_AUTH } from "../config/resources";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(ENABLE_AUTH);
  const [authenticated, setAuthenticated] = useState(!ENABLE_AUTH || Boolean(getToken()));

  const loadMe = useCallback(async () => {
    if (!ENABLE_AUTH || !getToken()) {
      setBooting(false);
      return;
    }
    try {
      const data = await api.get(authEndpoints.me);
      setUser(data?.user || data);
      setAuthenticated(true);
    } catch {
      clearToken();
      setAuthenticated(false);
    } finally {
      setBooting(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const login = async (payload) => {
    const data = await api.post(authEndpoints.login, payload);
    const token = data?.token || data?.accessToken || data?.data?.token;
    if (token) setToken(token);
    setUser(data?.user || data?.data?.user || null);
    setAuthenticated(true);
    return data;
  };

  const register = async (payload) => {
    const data = await api.post(authEndpoints.register, payload);
    const token = data?.token || data?.accessToken || data?.data?.token;
    if (token) setToken(token);
    setUser(data?.user || data?.data?.user || null);
    setAuthenticated(Boolean(token) || !ENABLE_AUTH);
    return data;
  };

  const logout = async () => {
    try {
      await api.post(authEndpoints.logout, {});
    } catch {
      // Local logout still succeeds if the backend has no logout endpoint.
    }
    clearToken();
    setUser(null);
    setAuthenticated(!ENABLE_AUTH);
  };

  const value = useMemo(
    () => ({ user, booting, authenticated, login, register, logout }),
    [user, booting, authenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
