import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, apiGet, apiPost } from "@/lib/api";
import { FileDown, Loader2, LogOut, RefreshCw } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Rfq {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string | null;
  requirement_type: string;
  location: string | null;
  message: string;
  attachment_path: string | null;
  attachment_name: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [checking, setChecking] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadRfqs = useCallback(async () => {
    const list = await apiGet<Rfq[]>("/rfq");
    setRfqs(list);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const me = await apiGet<AdminUser>("/auth/me");
        setUser(me);
        await loadRfqs();
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }
        setError("Failed to load inquiries. Please try again.");
      } finally {
        setChecking(false);
      }
    })();
  }, [navigate, loadRfqs]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      await loadRfqs();
    } finally {
      setRefreshing(false);
    }
  };

  const logout = async () => {
    await apiPost("/auth/logout");
    navigate("/admin/login", { replace: true });
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0F17]">
        <Loader2 className="size-6 animate-spin text-[#FF6B00]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F1F5F9]" data-testid="admin-dashboard">
      <header className="border-b border-[#1E293B] bg-[#0B0F17]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 64 64" className="size-8" aria-hidden="true">
              <rect width="64" height="64" rx="8" fill="#111827" />
              <path
                d="M14 48V16h7.5L32 34.5 42.5 16H50v32h-8V30.5L32 46 22 30.5V48h-8z"
                fill="#FF6B00"
              />
              <rect x="14" y="52" width="36" height="2" fill="#334155" />
            </svg>
            <div>
              <p className="font-heading text-sm font-semibold tracking-[0.08em] text-[#F8FAFC]">
                INQUIRIES DASHBOARD
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-testid="admin-refresh-btn"
              onClick={refresh}
              className="flex cursor-pointer items-center gap-2 border border-[#334155] px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] uppercase transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              data-testid="admin-logout-btn"
              onClick={logout}
              className="flex cursor-pointer items-center gap-2 border border-[#334155] px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] uppercase transition-colors hover:border-[#EF4444] hover:text-[#EF4444]"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
              Lead Capture
            </p>
            <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[#F8FAFC]">
              Submitted requirements
            </h1>
          </div>
          <p
            className="font-mono text-xs text-[#64748B]"
            data-testid="admin-rfq-count"
          >
            {rfqs.length} {rfqs.length === 1 ? "inquiry" : "inquiries"}
          </p>
        </div>

        {error && (
          <p className="mb-6 border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#F87171]">
            {error}
          </p>
        )}

        {rfqs.length === 0 && !error ? (
          <div
            className="border border-dashed border-[#334155] p-16 text-center"
            data-testid="admin-empty-state"
          >
            <p className="font-heading text-lg text-[#94A3B8]">No inquiries yet.</p>
            <p className="mt-2 text-sm text-[#64748B]">
              New RFQ submissions from the website will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="grid gap-px border border-[#1E293B] bg-[#1E293B]" data-testid="admin-rfq-list">
            {rfqs.map((r) => (
              <article
                key={r.id}
                data-testid={`admin-rfq-item-${r.id}`}
                className="grid gap-6 bg-[#0B0F17] p-6 transition-colors hover:bg-[#111827] lg:grid-cols-12 lg:p-7"
              >
                <div className="lg:col-span-3">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    {formatDate(r.created_at)} PKT
                  </p>
                  <p className="font-heading mt-2 text-base font-semibold text-[#F8FAFC]">
                    {r.name}
                  </p>
                  <p className="text-sm text-[#94A3B8]">{r.organization}</p>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    Type
                  </p>
                  <span className="mt-2 inline-block border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-[#FF6B00] uppercase">
                    {r.requirement_type}
                  </span>
                  {r.location && (
                    <p className="mt-2 text-xs text-[#94A3B8]">{r.location}</p>
                  )}
                </div>
                <div className="lg:col-span-3">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    Contact
                  </p>
                  <a
                    href={`mailto:${r.email}`}
                    className="mt-2 block text-sm break-all text-[#E2E8F0] transition-colors hover:text-[#FF6B00]"
                  >
                    {r.email}
                  </a>
                  {r.phone && <p className="mt-1 text-sm text-[#94A3B8]">{r.phone}</p>}
                  {r.attachment_path && (
                    <a
                      href={`/api/files/${r.attachment_path}`}
                      data-testid={`admin-rfq-attachment-${r.id}`}
                      className="mt-3 inline-flex items-center gap-2 border border-[#334155] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-[#94A3B8] uppercase transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    >
                      <FileDown className="size-3.5" aria-hidden="true" />
                      {r.attachment_name || "Attachment"}
                    </a>
                  )}
                </div>
                <div className="lg:col-span-4">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    Requirement
                  </p>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-[#CBD5E1]">
                    {r.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
