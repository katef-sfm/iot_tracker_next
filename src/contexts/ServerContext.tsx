import { createContext, useContext, useState } from "react";

const servers = (process.env.NEXT_PUBLIC_API_SERVERS || "https://iot-tracker.duo.cloud")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

type ServerContextValue = {
  servers: string[];
  server: string;
  setServer: (s: string) => void;
};

const ServerContext = createContext<ServerContextValue | undefined>(undefined);

export function ServerProvider({ children }: { children: React.ReactNode }) {
  const [server, setServerState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("api_server") || servers[0] || "";
    }
    return servers[0] || "";
  });

  const setServer = (s: string) => {
    if (typeof window !== "undefined") localStorage.setItem("api_server", s);
    setServerState(s);
  };

  return (
    <ServerContext.Provider value={{ servers, server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  const ctx = useContext(ServerContext);
  if (!ctx) throw new Error("useServer must be used within ServerProvider");
  return ctx;
}