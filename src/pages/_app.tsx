import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { ServerProvider } from "@/contexts/ServerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ServerProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ServerProvider>
  );
}
