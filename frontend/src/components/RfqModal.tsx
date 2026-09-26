import { createContext, useContext, useState } from "react";
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
import { ArrowRight, Loader2 } from "lucide-react";

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
};

export function RfqProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<RfqPayload>(EMPTY);

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
                rows={5}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                className="border-[#334155] bg-[#111827] text-[#F8FAFC]"
                placeholder="Describe the scope, specifications, quantities, timelines, or attach context for your RFQ / BOQ."
              />
              <p className="font-mono text-[11px] text-[#64748B]">
                BOQ documents &amp; drawings can be shared by email after this
                initial submission.
              </p>
            </div>

            <Button
              type="submit"
              data-testid="rfq-submit-btn"
              disabled={mutation.isPending}
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
