import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Layout>
      <div className="mx-auto max-w-md rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Register</h2>
        <form className="mt-4 space-y-4" onSubmit={submit}>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={set("name")}
            required
          />
          <input
            className="w-full rounded border px-3 py-2"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            required
          />
          <input
            className="w-full rounded border px-3 py-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={set("password")}
            required
          />
          <input
            className="w-full rounded border px-3 py-2"
            type="password"
            placeholder="Confirm password"
            value={form.password_confirmation}
            onChange={set("password_confirmation")}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
          >
            {loading ? "..." : "Register"}
          </button>
        </form>
      </div>
    </Layout>
  );
}