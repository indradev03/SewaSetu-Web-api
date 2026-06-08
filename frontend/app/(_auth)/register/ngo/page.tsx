"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, Hash, Calendar, User, Mail, Lock, Eye, EyeOff, FileUp, MapPin,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Component → Action → API
    const result = await registerNGOAction(form);

    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f4f8f3] via-white to-[#f7faf5] px-6 pt-28 pb-16 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            NGO Registration <span className="text-green-700">SewaSetu</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Build trust with verified registration. Complete your organization profile for approval.
          </p>
        </div>

        {errors.root && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-600">
            {errors.root}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ORGANIZATION */}
          <Section title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FieldInput icon={<Building2 size={18} />} name="organizationName" placeholder="Organization Name" onChange={handleChange} required error={errors.organizationName} />
              <FieldInput icon={<Hash size={18} />} name="registrationNumber" placeholder="Registration Number" onChange={handleChange} required error={errors.registrationNumber} />
              <FieldInput icon={<MapPin size={18} />} name="address" placeholder="Organization Address (optional)" onChange={handleChange} error={errors.address} />

              <div>
                <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm">
                  <Calendar size={18} className="text-gray-500" />
                  <select
                    name="yearEstablished"
                    onChange={handleChange}
                    required
                    className="w-full py-3 outline-none text-sm bg-transparent text-gray-700"
                  >
                    <option value="">Year Established</option>
                    {Array.from({ length: 40 }).map((_, i) => {
                      const year = 2026 - i;
                      return <option key={year} value={String(year)}>{year}</option>;
                    })}
                  </select>
                </div>
                {errors.yearEstablished && <p className="text-xs text-red-500 mt-1">{errors.yearEstablished}</p>}
              </div>
            </div>
          </Section>

          {/* CONTACT */}
          <Section title="Contact & Account">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FieldInput icon={<User size={18} />} name="contactPerson" placeholder="Contact Person Name" onChange={handleChange} required error={errors.contactPerson} />
              <FieldInput icon={<Mail size={18} />} name="email" type="email" placeholder="Official Email Address" onChange={handleChange} required error={errors.email} />

              {/* Password */}
              <div>
                <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm">
                  <Lock size={18} className="text-gray-500" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full py-3 outline-none text-sm bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm">
                  <Lock size={18} className="text-gray-500" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full py-3 outline-none text-sm bg-transparent"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </Section>

          {/* DOCUMENTS */}
          <Section title="Documents (Optional)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox label="Registration Certificate" file={files.registrationDocPath} onChange={handleFile("registrationDocPath")} />
              <UploadBox label="PAN Certificate" file={files.panCardPath} onChange={handleFile("panCardPath")} />
            </div>
          </Section>

          {/* MISSION */}
          <Section title="Mission & Impact">
            <div>
              <textarea
                name="impactDescription"
                rows={5}
                placeholder="Describe your mission, projects, and impact..."
                onChange={handleChange}
                required
                className={`w-full border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-green-500
                  bg-white shadow-sm resize-none text-gray-700 ${errors.impactDescription ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.impactDescription && <p className="text-xs text-red-500 mt-1">{errors.impactDescription}</p>}
            </div>
          </Section>

          <div className="flex flex-col items-center space-y-4 pt-2">
            <Button type="submit" variant="green" disabled={loading}>
              {loading ? "Submitting…" : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
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
    <div>
      <div className={`flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm ${error ? "border-red-400" : ""}`}>
        <span className="text-gray-500">{icon}</span>
        <input {...props} className="w-full py-3 outline-none text-sm bg-transparent text-gray-700" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function UploadBox({
  label, file, onChange,
}: {
  label: string;
  file?: File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-white">
      <FileUp size={22} className="text-gray-400" />
      <p className="text-sm mt-2 font-medium text-gray-700">{label}</p>
      {file ? (
        <p className="text-xs text-green-600 mt-1">{file.name}</p>
      ) : (
        <p className="text-xs text-gray-400 mt-1">Click to upload</p>
      )}
      <input type="file" hidden onChange={onChange} />
    </label>
  );
}