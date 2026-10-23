import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

type User = {
  id: number;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: Record<string, string>) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      api
        .post("/api/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await api.post("/api/login", { username, password });
    const t = res.data?.access_token || res.data?.token || res.data?.data?.token;
    if (t) localStorage.setItem("token", t);
    setToken(t || null);
    if (res.data?.user) {
      setUser(res.data.user);
      if (res.data.user.id != null) localStorage.setItem("user_id", String(res.data.user.id));
    }
    try {
      const me = await api.post("/api/me");
      const u = me.data?.user || me.data?.data || me.data;
      setUser(u);
      if (u?.id != null) localStorage.setItem("user_id", String(u.id));
    } catch {
      // keep user from login response
    }
  }, []);

  const register = useCallback(async (payload: Record<string, string>) => {
    await api.post("/api/register", payload);
  }, []);

  const logout = useCallback(() => {
    api.post("/api/logout").catch(() => {});
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}