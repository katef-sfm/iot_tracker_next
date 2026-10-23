import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import { lightningChart, SolidFill, ColorRGBA } from "@lightningchart/lcjs";

const ranges = [
  { label: "24h", hours: 24 },
  { label: "48h", hours: 48 },
  { label: "72h", hours: 72 },
  { label: "1 week", hours: 24 * 7 },
  { label: "2 weeks", hours: 24 * 14 },
  { label: "1 month", hours: 24 * 30 },
];

export default function DeviceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const chartRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<any>(null);
  const [mesures, setMesures] = useState<any[]>([]);
  const [range, setRange] = useState(24);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      api.get(`/api/v1/devices/${id}`),
      api.get(`/api/v1/devices/${id}/mesures`),
    ])
      .then(([dRes, mRes]) => {
        const dev = dRes.data?.data;
        setDevice(dev ? { id: dev.id, ...(dev.attributes || {}) } : null);
        const list = mRes.data?.data || [];
        setMesures(list.map((r: any) => ({ id: r.id, ...(r.attributes || {}) })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!chartRef.current || mesures.length === 0) return;
    const lc = lightningChart();
    const chart = lc.ChartXY({ container: chartRef.current });
    const series = chart.addLineSeries();
    const cutoff = Date.now() - range * 3600 * 1000;
    const points = mesures
      .map((m) => ({
        x: new Date(m.createdAt || m.createdDate || Date.now()).getTime(),
        y: Number(m.valeur1 ?? 0),
      }))
      .filter((p) => p.x >= cutoff)
      .sort((a, b) => a.x - b.x);
    series.appendJSON(points.map((p) => ({ x: p.x, y: p.y })));
    series.setStrokeStyle((s) => s.setFillStyle(new SolidFill({ color: ColorRGBA(0, 100, 255) })));
    return () => {
      chart.dispose();
    };
  }, [mesures, range]);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold">{device?.name || `Device ${id}`}</h2>
      <p className="mt-1 text-gray-500">ID: {id}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {ranges.map((r) => (
          <button
            key={r.label}
            onClick={() => setRange(r.hours)}
            className={`rounded px-3 py-1 text-sm ${
              range === r.hours ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded bg-white p-4 shadow">
        <div ref={chartRef} style={{ height: 400, width: "100%" }} />
      </div>

      <div className="mt-6 rounded bg-white p-4 shadow">
        <h3 className="font-semibold">Infos</h3>
        <pre className="mt-2 overflow-auto text-xs">
          {JSON.stringify(device, null, 2)}
        </pre>
      </div>
    </Layout>
  );
}