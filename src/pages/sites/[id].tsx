import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import api from "@/lib/api";

export default function SiteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/v1/sites/${id}`)
      .then((res) => {
        const r = res.data?.data;
        setSite(r ? { id: r.id, ...(r.attributes || {}) } : null);
      })
      .catch((e) => setError(e?.response?.data?.message || "Failed to load site"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="mb-4">
        <Link href="/sites" className="text-blue-600">
          &larr; Back to sites
        </Link>
      </div>
      <h2 className="text-2xl font-bold">{site?.name || `Site ${id}`}</h2>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6 rounded bg-white p-4 shadow">
        <pre className="overflow-auto text-xs">{JSON.stringify(site, null, 2)}</pre>
      </div>
    </Layout>
  );
}