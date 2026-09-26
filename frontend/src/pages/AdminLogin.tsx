import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, apiPost } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

function formatApiErrorDetail(detail: unknown): string {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) =>
        e && typeof e === "object" && "msg" in e ? String(e.msg) : JSON.stringify(e)
      )
      .filter(Boolean)
      .join(" ");
  if (typeof detail === "object" && "msg" in detail)
    return String((detail as { msg: unknown }).msg);
  return String(detail);
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiPost<AdminUser>("/auth/login", { email, password });
      navigate("/admin", { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(formatApiErrorDetail((err.body as { detail?: unknown })?.detail));
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F17] px-5">
      <div className="tech-grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        data-testid="admin-login-card"
        className="relative w-full max-w-sm border border-[#1E293B] bg-[#111827] p-8"
      >
        <div className="mb-8 flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true">
            <rect width="64" height="64" rx="8" fill="#0B0F17" />
            <path
              d="M14 48V16h7.5L32 34.5 42.5 16H50v32h-8V30.5L32 46 22 30.5V48h-8z"
              fill="#FF6B00"
            />
            <rect x="14" y="52" width="36" height="2" fill="#334155" />
          </svg>
          <div>
            <p className="font-heading text-sm font-semibold tracking-[0.08em] text-[#F8FAFC]">
              MIDAS SOURCES
            </p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.28em] text-[#64748B] uppercase">
              Admin Access
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4" data-testid="admin-login-form">
          <div className="grid gap-1.5">
            <Label htmlFor="admin-email" className="text-[#94A3B8]">
              Email
            </Label>
            <Input
              id="admin-email"
              data-testid="admin-email-input"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#334155] bg-[#0B0F17] text-[#F8FAFC]"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="admin-password" className="text-[#94A3B8]">
              Password
            </Label>
            <Input
              id="admin-password"
              data-testid="admin-password-input"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#334155] bg-[#0B0F17] text-[#F8FAFC]"
            />
          </div>

          {error && (
            <p
              data-testid="admin-login-error"
              className="border border-[#EF4444]/40 bg-[#EF4444]/10 px-3 py-2 text-sm text-[#F87171]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            data-testid="admin-login-submit"
            disabled={loading}
            className="mt-2 flex h-11 cursor-pointer items-center justify-center gap-3 bg-[#FF6B00] font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#E05E00] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Sign in
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <a
          href="/"
          data-testid="admin-login-back-link"
          className="mt-6 block text-center font-mono text-[11px] tracking-[0.14em] text-[#64748B] uppercase transition-colors hover:text-[#F8FAFC]"
        >
          ← Back to site
        </a>
      </div>
    </div>
  );
}
