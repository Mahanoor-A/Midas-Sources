import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, apiGet, apiPatch, apiPost } from "@/lib/api";
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
  status: string;
  created_at: string;
}

const STATUSES = ["New", "Contacted", "Quoted", "Closed"] as const;

const STATUS_STYLES: Record<string, string> = {
  New: "border-[#FF6B00]/50 bg-[#FF6B00]/10 text-[#FF6B00]",
  Contacted: "border-[#38BDF8]/50 bg-[#38BDF8]/10 text-[#38BDF8]",
  Quoted: "border-[#22C55E]/50 bg-[#22C55E]/10 text-[#22C55E]",
  Closed: "border-[#64748B]/50 bg-[#64748B]/10 text-[#94A3B8]",
};

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
  const [filter, setFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  const setStatus = async (rfq: Rfq, status: string) => {
    if (rfq.status === status) return;
    setUpdatingId(rfq.id);
    try {
      const updated = await apiPatch<Rfq>(`/rfq/${rfq.id}/status`, { status });
      setRfqs((list) => list.map((r) => (r.id === rfq.id ? updated : r)));
    } catch {
      setError("Could not update the status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: rfqs.length };
    for (const s of STATUSES) c[s] = 0;
    for (const r of rfqs) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rfqs]);

  const visible = filter === "All" ? rfqs : rfqs.filter((r) => r.status === filter);

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
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
              Lead Capture
            </p>
            <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[#F8FAFC]">
              Submitted requirements
            </h1>
          </div>
          <p className="font-mono text-xs text-[#64748B]" data-testid="admin-rfq-count">
            {rfqs.length} {rfqs.length === 1 ? "inquiry" : "inquiries"}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" data-testid="admin-status-filters">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              data-testid={`status-filter-${s.toLowerCase()}`}
              onClick={() => setFilter(s)}
              className={`cursor-pointer border px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                filter === s
                  ? "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]"
                  : "border-[#334155] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
              }`}
            >
              {s}
              <span className="ml-2 text-[#64748B]">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-6 border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#F87171]">
            {error}
          </p>
        )}

        {visible.length === 0 && !error ? (
          <div
            className="border border-dashed border-[#334155] p-16 text-center"
            data-testid="admin-empty-state"
          >
            <p className="font-heading text-lg text-[#94A3B8]">
              {filter === "All" ? "No inquiries yet." : `No ${filter.toLowerCase()} inquiries.`}
            </p>
            <p className="mt-2 text-sm text-[#64748B]">
              New RFQ submissions from the website will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="grid gap-px border border-[#1E293B] bg-[#1E293B]" data-testid="admin-rfq-list">
            {visible.map((r) => (
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
                  <span
                    data-testid={`status-badge-${r.id}`}
                    className={`mt-3 inline-block border px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${STATUS_STYLES[r.status] ?? STATUS_STYLES.New}`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    Type
                  </p>
                  <span className="mt-2 inline-block border border-[#334155] bg-[#1E293B]/60 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-[#CBD5E1] uppercase">
                    {r.requirement_type}
                  </span>
                  {r.location && (
                    <p className="mt-2 text-xs text-[#94A3B8]">{r.location}</p>
                  )}
                  <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    Move to
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        data-testid={`status-set-${s.toLowerCase()}-${r.id}`}
                        onClick={() => setStatus(r, s)}
                        disabled={updatingId === r.id || r.status === s}
                        className={`cursor-pointer border px-2 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors disabled:cursor-default ${
                          r.status === s
                            ? "border-transparent text-[#475569]"
                            : "border-[#334155] text-[#94A3B8] hover:border-[#FF6B00] hover:text-[#FF6B00]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
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
