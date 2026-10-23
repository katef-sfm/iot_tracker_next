import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import JwtProfiler from "@/components/JwtProfiler";

const nav = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sites", label: "Sites" },
  { href: "/boxes", label: "Boxes" },
  { href: "/devices", label: "Devices" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout, token } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold text-blue-600">
            IoT Tracker
          </Link>
          <nav className="flex gap-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm ${
                  router.pathname === n.href ? "font-bold text-blue-600" : "text-gray-600"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {token ? (
              <>
                <span className="text-sm text-gray-600">{user?.username || user?.email}</span>
                <button
                  onClick={logout}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="text-sm text-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 pb-24">{children}</main>
      <JwtProfiler />
    </div>
  );
}