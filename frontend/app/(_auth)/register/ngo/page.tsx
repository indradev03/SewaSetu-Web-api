"use client";

import "../../../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Hash,
  Calendar,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  FileUp,
  MapPin,
  FileCheck,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import {
  registerNGOAction,
  type NGORegisterInput,
} from "@/app/lib/actions/ngo.actions";

type FormState = NGORegisterInput;

export default function NGORegister() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    organizationName: "",
    registrationNumber: "",
    yearEstablished: "",
    contactPerson: "",
    email: "",
    password: "",
    confirmPassword: "",
    impactDescription: "",
    address: "",
  });

  const [files, setFiles] = useState<{
    registrationDocPath?: File;
    panCardPath?: File;
  }>({});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile =
    (field: "registrationDocPath" | "panCardPath") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFiles((prev) => ({ ...prev, [field]: e.target.files![0] }));
      }
    };

  const clearFile = (
    field: "registrationDocPath" | "panCardPath",
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setErrors({});
    setLoading(true);

    const result = await registerNGOAction(form);
    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-24 pb-20 flex justify-center  text-slate-800 antialiased">
      <div className="w-full max-w-5xl space-y-10">
        {/* Decorative Top Branding Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-green-100/80 shadow-sm">
            <ShieldCheck size={14} className="text-green-600" />
            Verified Partner Portal
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            NGO Onboarding{" "}
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              SewaSetu
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed">
            Register your organization profile to deploy trust tokens across our
            secure, verified support ecosystem.
          </p>
        </div>

        {/* Dynamic Global Root Level Error Display */}
        {errors.root && (
          <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-sm text-red-600 shadow-sm animate-in fade-in duration-200">
            <span className="font-semibold">Registration Issue:</span>{" "}
            {errors.root}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: IDENTITY */}
          <FormPanel
            title="Organization Profile"
            description="Establish corporate data properties and physical identification metrics."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldInput
                icon={<Building2 size={18} />}
                name="organizationName"
                placeholder="Organization Name (As registered)"
                value={form.organizationName}
                onChange={handleChange}
                required
                error={errors.organizationName}
              />
              <FieldInput
                icon={<Hash size={18} />}
                name="registrationNumber"
                placeholder="Registration / Identity Code Number"
                value={form.registrationNumber}
                onChange={handleChange}
                required
                error={errors.registrationNumber}
              />
              <FieldInput
                icon={<MapPin size={18} />}
                name="address"
                placeholder="Headquarters Registered Address (Optional)"
                value={form.address || ""}
                onChange={handleChange}
                error={errors.address}
              />

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border border-slate-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-50/80 rounded-xl px-3 bg-white shadow-sm transition-all duration-200">
                  <Calendar size={18} className="text-green-600 shrink-0" />
                  <select
                    name="yearEstablished"
                    value={form.yearEstablished}
                    onChange={handleChange}
                    required
                    className="w-full py-3.5 outline-none text-sm bg-transparent text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="">Select Year Established</option>
                    {Array.from({ length: 40 }).map((_, i) => {
                      const year = 2026 - i;
                      return (
                        <option key={year} value={String(year)}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.yearEstablished && (
                  <p className="text-xs text-red-500 font-medium pl-1">
                    {errors.yearEstablished}
                  </p>
                )}
              </div>
            </div>
          </FormPanel>

          {/* SECTION 2: ACCESS CREDENTIALS */}
          <FormPanel
            title="Administrative Gateway"
            description="Configure direct account credentials and contact representative endpoints."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldInput
                icon={<User size={18} />}
                name="contactPerson"
                placeholder="Assigned Lead Representative Name"
                value={form.contactPerson}
                onChange={handleChange}
                required
                error={errors.contactPerson}
              />
              <FieldInput
                icon={<Mail size={18} />}
                name="email"
                type="email"
                placeholder="Official Organizational Email Address"
                value={form.email}
                onChange={handleChange}
                required
                error={errors.email}
              />

              {/* Secure Password Input Block */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border border-slate-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-50/80 rounded-xl px-3 bg-white shadow-sm transition-all duration-200">
                  <Lock size={18} className="text-green-600 shrink-0" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Secure System Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full py-3.5 outline-none text-sm bg-transparent text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-green-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 font-medium pl-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Input Block */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 border border-slate-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-50/80 rounded-xl px-3 bg-white shadow-sm transition-all duration-200">
                  <Lock size={18} className="text-green-600 shrink-0" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Verify System Password Match"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full py-3.5 outline-none text-sm bg-transparent text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-green-600 transition-colors p-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 font-medium pl-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </FormPanel>

          {/* SECTION 3: VERIFICATION ARTIFACTS (SEPARATE) */}
          <FormPanel
            title="Verification Artifacts"
            description="Attach your official certificates to gain immediate credibility points and platform trust tags."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UploadBox
                label="NGO Registration Artifact"
                file={files.registrationDocPath}
                onChange={handleFile("registrationDocPath")}
                onClear={(e) => clearFile("registrationDocPath", e)}
              />
              <UploadBox
                label="Official Tax PAN Document"
                file={files.panCardPath}
                onChange={handleFile("panCardPath")}
                onClear={(e) => clearFile("panCardPath", e)}
              />
            </div>
          </FormPanel>

          {/* SECTION 4: MISSION FRAMEWORK (SEPARATE) */}
          <FormPanel
            title="Mission Framework & Narrative"
            description="Detail the core focus sectors, target demographics, and prospective metrics of your NGO."
          >
            <div className="space-y-1.5">
              <textarea
                name="impactDescription"
                rows={5}
                value={form.impactDescription}
                placeholder="Outline your primary vision paths, local targeting communities, resource metrics, or active social programs here..."
                onChange={handleChange}
                required
                className={`w-full border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-green-50/80 focus:border-green-500
                  bg-white shadow-sm resize-none text-slate-700 transition-all duration-200 leading-relaxed ${
                    errors.impactDescription
                      ? "border-red-400"
                      : "border-slate-200"
                  }`}
              />
              {errors.impactDescription && (
                <p className="text-xs text-red-500 font-medium pl-1">
                  {errors.impactDescription}
                </p>
              )}
            </div>
          </FormPanel>

          {/* TERMS & CONDITIONS MANDATORY ACCORD ZONE */}
          <div
            className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
              agreedToTerms
                ? "bg-green-50/40 border-green-500/80 shadow-sm"
                : "bg-slate-50 border-slate-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center h-6 mt-0.5 relative shrink-0">
                <input
                  id="legalAccord"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="peer h-5 w-5 rounded border-2 border-slate-400 bg-white checked:bg-green-600 checked:border-transparent focus:ring-green-500 focus:ring-offset-0 cursor-pointer transition-all appearance-none"
                />
                <Check
                  size={12}
                  className="text-white absolute pointer-events-none left-1 top-1.5 hidden peer-checked:block stroke-3"
                />
              </div>
              <label
                htmlFor="legalAccord"
                className="text-xs md:text-sm text-slate-600 leading-relaxed cursor-pointer select-none font-medium"
              >
                I hereby declare that all supplied registration statistics,
                legal metadata parameters, and supporting verification files
                represent authenticated information belonging exclusively to our
                operating node. I explicitly accept the system{" "}
                <span className="text-green-600 hover:underline font-bold cursor-pointer">
                  Terms of Service
                </span>{" "}
                and authorize ecosystem review sequences.
              </label>
            </div>
          </div>

          {/* FINAL ONBOARD BUTTON TRIGGER CONTAINER */}
          <div className="flex flex-col items-center pt-2">
            <Button
              type="submit"
              variant="green"
              disabled={loading || !agreedToTerms}
              className={`w-full md:w-auto font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-600/10 transition-all duration-200 text-sm tracking-wide ${
                !agreedToTerms
                  ? "bg-slate-200 text-slate-400 border-transparent cursor-not-allowed shadow-none hover:bg-slate-200"
                  : "bg-green-600 hover:bg-green-700 text-white transform active:scale-[0.99]"
              }`}
            >
              {loading
                ? "Processing Onboarding..."
                : "Submit Profile for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── INTERACTIVE DESIGN COMPONENT MODULES ────────────────────── */

function FormPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6 transition-all hover:shadow-md/5">
      <div className="space-y-1">
        <h2 className="font-bold text-slate-900 text-xl tracking-tight">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-medium">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  error?: string;
};

function FieldInput({ icon, error, ...props }: FieldInputProps) {
  return (
    <div className="space-y-1.5">
      <div
        className={`flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm transition-all duration-200 focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:ring-red-100/70 focus-within:border-red-400"
            : "border-slate-200 focus-within:ring-green-50/80 focus-within:border-green-500"
        }`}
      >
        <span className="text-green-600 shrink-0 transition-colors">
          {icon}
        </span>
        <input
          {...props}
          className="w-full py-3.5 outline-none text-sm bg-transparent text-slate-700 placeholder-slate-400 font-medium"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-semibold pl-1">{error}</p>
      )}
    </div>
  );
}

function UploadBox({
  label,
  file,
  onChange,
  onClear,
}: {
  label: string;
  file?: File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="relative group w-full">
      <label
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 bg-white min-h-35 ${
          file
            ? "border-green-400 bg-green-50/10"
            : "border-slate-200 hover:border-green-400 hover:bg-slate-50/30"
        }`}
      >
        {file ? (
          <div className="animate-in zoom-in-95 duration-150">
            <div className="h-11 w-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2.5 mx-auto shadow-inner">
              <FileCheck size={20} />
            </div>
            <p className="text-xs font-bold text-slate-800">{label}</p>
            <p className="text-xs text-green-600 font-semibold mt-1 max-w-60 truncate px-2">
              {file.name}
            </p>

            <button
              type="button"
              onClick={onClear}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm z-10 border border-slate-200/40"
              title="Remove file attachment"
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <>
            <div className="h-11 w-11 rounded-full bg-slate-50 text-green-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform border border-slate-100 shadow-sm">
              <FileUp size={18} />
            </div>
            <p className="text-xs font-bold text-slate-700">{label}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              PDF, PNG, or JPG up to 5MB
            </p>
          </>
        )}
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          hidden
          onChange={onChange}
        />
      </label>
    </div>
  );
}
