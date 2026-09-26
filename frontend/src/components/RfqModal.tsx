import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/lib/api";
import { ArrowRight, FileCheck2, Loader2, Paperclip, X } from "lucide-react";

const REQUIREMENT_TYPES = [
  "RFQ",
  "BOQ / Specification",
  "Procurement Requirement",
  "Maintenance Scope",
  "Special Project",
  "General Inquiry",
];

interface RfqPayload {
  name: string;
  organization: string;
  email: string;
  phone: string;
  requirement_type: string;
  location: string;
  message: string;
  attachment_path: string | null;
  attachment_name: string | null;
}

interface Rfq extends RfqPayload {
  id: string;
  created_at: string;
}

interface RfqContextValue {
  openRfq: (requirementType?: string) => void;
}

const RfqContext = createContext<RfqContextValue>({ openRfq: () => {} });

export function useRfq() {
  return useContext(RfqContext);
}

const EMPTY: RfqPayload = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  requirement_type: "RFQ",
  location: "",
  message: "",
  attachment_path: null,
  attachment_name: null,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function RfqProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<RfqPayload>(EMPTY);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openRfq = (requirementType?: string) => {
    setForm((f) => ({
      ...f,
      requirement_type:
        requirementType && REQUIREMENT_TYPES.includes(requirementType)
          ? requirementType
          : f.requirement_type,
    }));
    setOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (payload: RfqPayload) => apiPost<Rfq>("/rfq", payload),
    onSuccess: () => {
      toast.success("Requirement received", {
        description:
          "Thank you. Our team will review your requirement and respond shortly.",
      });
      setForm(EMPTY);
      setOpen(false);
    },
    onError: () => {
      toast.error("Submission failed", {
        description:
          "Please try again, or email us directly at midassourcespakistan@gmail.com.",
      });
    },
  });

  const set = (key: keyof RfqPayload) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Maximum attachment size is 10 MB.",
      });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`upload failed with ${res.status}`);
      const data = (await res.json()) as { path: string; name: string };
      setForm((f) => ({
        ...f,
        attachment_path: data.path,
        attachment_name: data.name,
      }));
      toast.success("Document attached", { description: data.name });
    } catch {
      toast.error("Upload failed", {
        description:
          "Please try again, or mention the document in your message instead.",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = () =>
    setForm((f) => ({ ...f, attachment_path: null, attachment_name: null }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <RfqContext.Provider value={{ openRfq }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-testid="rfq-modal"
          className="max-h-[92vh] overflow-y-auto border border-[#334155] bg-[#0B0F17] text-[#F8FAFC] sm:max-w-xl"
        >
          <DialogHeader>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#FF6B00] uppercase">
              Institutional Engagement
            </p>
            <DialogTitle
              className="font-heading text-2xl font-semibold tracking-tight"
              data-testid="rfq-modal-title"
            >
              Submit your requirement
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Share an RFQ, BOQ, specification or scope of work. Our team will
              review it and respond with a considered proposal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="rfq-name" className="text-[#94A3B8]">
                  Full name *
                </Label>
                <Input
                  id="rfq-name"
                  data-testid="rfq-input-name"
                  required
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="rfq-org" className="text-[#94A3B8]">
                  Organization *
                </Label>
                <Input
                  id="rfq-org"
                  data-testid="rfq-input-organization"
                  required
                  value={form.organization}
                  onChange={(e) => set("organization")(e.target.value)}
                  className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  placeholder="Company / institution"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="rfq-email" className="text-[#94A3B8]">
                  Email *
                </Label>
                <Input
                  id="rfq-email"
                  data-testid="rfq-input-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  placeholder="name@organization.com"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="rfq-phone" className="text-[#94A3B8]">
                  Phone
                </Label>
                <Input
                  id="rfq-phone"
                  data-testid="rfq-input-phone"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  placeholder="+92 ..."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label className="text-[#94A3B8]">Requirement type *</Label>
                <Select
                  value={form.requirement_type}
                  onValueChange={(v) => set("requirement_type")(v)}
                >
                  <SelectTrigger
                    data-testid="rfq-select-type"
                    className="w-full border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  >
                    <SelectValue>{(v) => v as string}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="border-[#334155] bg-[#111827] text-[#F8FAFC]">
                    {REQUIREMENT_TYPES.map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                        data-testid={`rfq-type-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="rfq-location" className="text-[#94A3B8]">
                  Project location / city
                </Label>
                <Input
                  id="rfq-location"
                  data-testid="rfq-input-location"
                  value={form.location}
                  onChange={(e) => set("location")(e.target.value)}
                  className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                  placeholder="e.g. Islamabad"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="rfq-message" className="text-[#94A3B8]">
                Requirement details *
              </Label>
              <Textarea
                id="rfq-message"
                data-testid="rfq-input-message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                placeholder="Describe the scope, specifications, quantities and timelines."
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-[#94A3B8]">
                BOQ / drawings / specifications (optional)
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                data-testid="rfq-attachment-input"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.xls,.xlsx,.csv,.txt,.dwg"
                onChange={handleFile}
              />
              {form.attachment_name ? (
                <div
                  className="flex items-center justify-between border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3 py-2.5"
                  data-testid="rfq-attachment-chip"
                >
                  <span className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                    <FileCheck2 className="size-4 text-[#FF6B00]" aria-hidden="true" />
                    <span className="max-w-72 truncate">{form.attachment_name}</span>
                  </span>
                  <button
                    type="button"
                    data-testid="rfq-attachment-remove"
                    onClick={removeAttachment}
                    aria-label="Remove attachment"
                    className="cursor-pointer text-[#94A3B8] transition-colors hover:text-[#EF4444]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  data-testid="rfq-attachment-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex cursor-pointer items-center justify-center gap-2.5 border border-dashed border-[#334155] px-4 py-3.5 font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] uppercase transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Paperclip className="size-4" aria-hidden="true" />
                      Attach document — PDF, image, office file (max 10 MB)
                    </>
                  )}
                </button>
              )}
            </div>

            <Button
              type="submit"
              data-testid="rfq-submit-btn"
              disabled={mutation.isPending || uploading}
              className="mt-1 h-11 w-full rounded-none bg-[#FF6B00] font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#E05E00]"
            >
              {mutation.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  Submit requirement
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </RfqContext.Provider>
  );
}
