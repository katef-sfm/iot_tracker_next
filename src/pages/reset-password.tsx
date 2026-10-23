import { useState } from "react";
import Layout from "@/components/Layout";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Layout>
      <div className="mx-auto max-w-md rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Reset password</h2>
        {done ? (
          <p className="mt-4 text-green-600">
            If the email exists, a reset link has been sent.
          </p>
        ) : (
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <input
              className="w-full rounded border px-3 py-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full rounded bg-blue-600 py-2 text-white">
              Send reset link
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}