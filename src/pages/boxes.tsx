import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";

export default function Boxes() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/v1/boxes")
      .then((res) => setItems((res.data?.data || []).map((r: any) => ({ id: r.id, ...(r.attributes || {}) }))))
      .catch((e) => setError(e?.response?.data?.message || "Failed to load boxes"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Boxes</h2>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <ul className="mt-6 space-y-2">
        {items.map((b) => (
          <li key={b.id} className="rounded bg-white p-4 shadow">
            {b.name} <span className="text-gray-400">#{b.id}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
