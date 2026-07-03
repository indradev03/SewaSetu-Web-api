"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  createReward,
  updateReward,
  Reward,
  DiscountType,
} from "@/app/lib/api/rewards.api";

import { getImageUrl } from "@/app/lib/utils/getImageUrl";

// ── Helpers ───────────────────────────────────────────

const toDateInputValue = (date?: string) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

// ── Props ─────────────────────────────────────────────

interface RewardFormProps {
  mode: "create" | "edit";
  reward?: Reward;
}

// ── Component ─────────────────────────────────────────

export default function RewardForm({ mode, reward }: RewardFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(reward?.title || "");
  const [partnerName, setPartnerName] = useState(reward?.partnerName || "");
  const [description, setDescription] = useState(reward?.description || "");
  const [promoCode, setPromoCode] = useState(reward?.promoCode || "");

  const [discountType, setDiscountType] = useState<DiscountType>(
    reward?.discountType || "percentage",
  );

  const [discountValue, setDiscountValue] = useState(
    reward?.discountValue !== undefined ? String(reward.discountValue) : "",
  );

  const [terms, setTerms] = useState(reward?.terms || "");
  const [expiryDate, setExpiryDate] = useState(
    toDateInputValue(reward?.expiryDate),
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // ✅ FIXED IMAGE (USING SHARED HELPER)
  const imageSrc = preview || getImageUrl("rewards", reward?.image);

  // ── Submit ───────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("partnerName", partnerName);
    formData.append("description", description);
    formData.append("promoCode", promoCode);
    formData.append("discountType", discountType);

    formData.append(
      "discountValue",
      discountType === "freebie" ? "0" : String(Number(discountValue)),
    );

    if (terms) formData.append("terms", terms);

    formData.append("expiryDate", new Date(expiryDate).toISOString());

    if (file) formData.append("image", file);

    try {
      const res =
        mode === "create"
          ? await createReward(formData)
          : await updateReward(reward!._id, formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/admin/rewards");
        router.refresh();
      } else {
        setErrors({ root: res.message || "Something went wrong" });
        toast.error(res.message || "Something went wrong");
      }
    } catch (err: any) {
      console.log("FORM ERROR:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6 max-w-3xl"
    >
      {/* IMAGE */}
      <div>
        <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">
          Reward Image
        </label>

        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="reward"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus size={20} className="text-slate-300" />
            )}
          </div>

          <label className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold cursor-pointer hover:bg-slate-200">
            <ImagePlus size={14} />
            {file ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }}
            />
          </label>
        </div>
      </div>

      {/* TITLE / PARTNER */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </Field>

        <Field label="Partner Name">
          <input
            required
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="form-input"
          />
        </Field>
      </div>

      {/* DESCRIPTION */}
      <Field label="Description">
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input resize-none"
        />
      </Field>

      {/* PROMO / EXPIRY */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Promo Code">
          <input
            required
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="form-input font-mono"
          />
        </Field>

        <Field label="Expiry Date">
          <input
            required
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="form-input"
          />
        </Field>
      </div>

      {/* DISCOUNT */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Discount Type">
          <select
            value={discountType}
            onChange={(e) => {
              const value = e.target.value as DiscountType;
              setDiscountType(value);
              if (value === "freebie") setDiscountValue("0");
            }}
            className="form-input"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="freebie">Freebie</option>
          </select>
        </Field>

        <Field label="Discount Value">
          <input
            required
            type="number"
            min={0}
            disabled={discountType === "freebie"}
            value={discountType === "freebie" ? 0 : discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="form-input disabled:bg-slate-50"
          />
        </Field>
      </div>

      {/* TERMS */}
      <Field label="Terms (optional)">
        <textarea
          rows={2}
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          className="form-input resize-none"
        />
      </Field>

      {/* ERROR */}
      {errors.root && <p className="text-xs text-red-500">{errors.root}</p>}

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {mode === "create" ? "Create Reward" : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/rewards")}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>

      {/* FIELD WRAPPER */}
      <style jsx>{`
        .form-input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.65rem 1rem;
          font-size: 0.875rem;
        }
        .form-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
          outline: none;
        }
      `}</style>
    </form>
  );
}

// ── Field ─────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}
