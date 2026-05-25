"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function NGOSignup() {
  const [form, setForm] = useState({
    orgName: "",
    regNumber: "",
    yearEstablished: "",
    representative: "",
    email: "",
    password: "",
    mission: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f4f8f3] via-white to-[#f7faf5] px-6 pt-28 pb-16 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            NGO Registration{" "}
            <span className="text-green-700">SewaSetu</span>
          </h1>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Build trust with verified registration. Complete your organization profile for approval.
          </p>
        </div>

        {/* INFO BANNER */}
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-blue-700">🔐 Verification Process</h3>
          <p className="text-sm text-blue-600 mt-1">
            Our team verifies documents within 3–5 business days to ensure transparency and donor trust.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ORGANIZATION */}
          <Section title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <Input
                icon={<Building2 size={18} />}
                name="orgName"
                placeholder="Organization Name"
                onChange={handleChange}
              />

              <Input
                icon={<Hash size={18} />}
                name="regNumber"
                placeholder="Registration Number"
                onChange={handleChange}
              />

              <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition">
                <Calendar size={18} className="text-gray-500" />

                <select
                  name="yearEstablished"
                  onChange={handleChange}
                  className="w-full py-3 outline-none text-sm bg-transparent"
                >
                  <option value="">Year Established</option>
                  {Array.from({ length: 40 }).map((_, i) => {
                    const year = 2026 - i;
                    return <option key={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>
          </Section>

          {/* CONTACT */}
          <Section title="Contact & Account">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <Input
                icon={<User size={18} />}
                name="representative"
                placeholder="Representative Name"
                onChange={handleChange}
              />

              <Input
                icon={<Mail size={18} />}
                name="email"
                placeholder="Official Email Address"
                onChange={handleChange}
              />

              <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition">
                <Lock size={18} className="text-gray-500" />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full py-3 outline-none text-sm bg-transparent"
                />

                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </Section>

          {/* DOCUMENTS */}
          <Section title="Required Documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox label="Registration Certificate" />
              <UploadBox label="PAN Certificate" />
            </div>
          </Section>

          {/* MISSION */}
          <Section title="Mission & Impact">
            <textarea
              name="mission"
              rows={5}
              placeholder="Describe your mission, projects, and impact..."
              onChange={handleChange}
              className="w-full border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm resize-none"
            />
          </Section>

          {/* ACTIONS */}
          <div className="flex flex-col items-center space-y-4 pt-2">

          {/* SUBMIT */}
          <button className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition">
            Submit for Review
          </button>

            {/* LOGIN */}
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-700 font-semibold hover:underline"
              >
                Login
              </a>
            </p>

            {/* FOOTER NOTE */}
          <p className="text-xs text-center text-gray-500 leading-relaxed max-w-md mx-auto">
            By continuing, you agree to SewaSetu’s{" "}
            <a href="/terms" className="text-green-700 font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-green-700 font-medium hover:underline">
              Privacy Policy
            </a>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/* SECTION */
function Section({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 hover:shadow-md transition">
      <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
      {children}
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-2 border rounded-xl px-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition">
      <span className="text-gray-500">{icon}</span>
      <input
        {...props}
        className="w-full py-3 outline-none text-sm bg-transparent"
      />
    </div>
  );
}

/* UPLOAD */
function UploadBox({ label }: any) {
  return (
    <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:border-green-500 hover:bg-green-50 transition group">
      <FileUp size={22} className="text-gray-400 group-hover:text-green-600 transition" />
      <p className="text-sm mt-2 font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">
        Drag & drop or click to upload
      </p>
      <input type="file" hidden />
    </label>
  );
}