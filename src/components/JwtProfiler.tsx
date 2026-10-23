import { useState } from "react";

function decodeJwt(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function JwtProfiler() {
  const [open, setOpen] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const payload = token ? decodeJwt(token) : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100"
      >
        {open ? "Hide" : "Show"} JWT profiler
      </button>
      {open && (
        <div className="max-h-64 overflow-auto px-4 py-3 text-xs">
          <div className="mb-2">
            <span className="font-semibold">Token:</span>
            <pre className="mt-1 break-all rounded bg-gray-100 p-2">
              {token || "No token stored"}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Decoded payload:</span>
            <pre className="mt-1 break-all rounded bg-gray-100 p-2">
              {payload ? JSON.stringify(payload, null, 2) : "Unable to decode"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}