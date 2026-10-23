import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import api from "@/lib/api";

export default function Devices() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/v1/devices")
      .then((res) => setItems((res.data?.data || []).map((r: any) => ({ id: r.id, ...(r.attributes || {}) }))))
      .catch((e) => setError(e?.response?.data?.message || "Failed to load devices"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Devices</h2>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <Link
            key={d.id}
            href={`/devices/${d.id}`}
            className="rounded bg-white p-4 shadow hover:shadow-md"
          >
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-sm text-gray-500">Device #{d.id}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
