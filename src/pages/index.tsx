import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">IoT Sensor Monitoring</h1>
        <p className="mt-4 text-gray-600">
          Monitor your devices, boxes and sites in real time.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded bg-blue-600 px-6 py-2 text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded border border-blue-600 px-6 py-2 text-blue-600"
          >
            Login
          </Link>
        </div>
      </section>
    </Layout>
  );
}