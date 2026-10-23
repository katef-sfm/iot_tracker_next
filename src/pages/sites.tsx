import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";

export default function Sites() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/v1/sites?timestamp=${Date.now()}`)
      .then((res) => setItems((res.data?.data || []).map((r: any) => ({ id: r.id, ...(r.attributes || {}) }))))
      .catch((e) => setError(e?.response?.data?.message || "Failed to load sites"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Sites</h2>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                Created
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2 text-sm">{s.id}</td>
                <td className="px-4 py-2 text-sm">
                  <a href={`/sites/${s.id}`} className="text-blue-600 hover:underline">
                    {s.name}
                  </a>
                </td>
                <td className="px-4 py-2 text-sm">{s.createdAt || s.created_at || "-"}</td>
                <td className="px-4 py-2 text-sm">{s.updatedAt || s.updated_at || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
