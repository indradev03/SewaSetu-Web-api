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
  FileText,
  LogIn,
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
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form, files);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f8f3] px-6 pt-28 pb-10 flex justify-center">

      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              NGO Registration <span className="text-green-700">SewaSetu</span>
            </h1>
            <p className="text-sm text-gray-500">
              Complete your profile for verification
            </p>
          </div>

          <a
            href="/login"
            className="flex items-center gap-2 text-sm text-green-700 hover:underline"
          >
            <LogIn size={16} />
            Already have an account? Login
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ORGANIZATION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-800">
              Organization Details
            </h2>

            <div className="grid grid-cols-3 gap-4">

              <Input icon={<Building2 size={18} />} name="orgName" placeholder="Organization Name" onChange={handleChange} />

              <Input icon={<Hash size={18} />} name="regNumber" placeholder="Registration Number" onChange={handleChange} />

              <div className="flex items-center gap-2 border rounded-xl px-3 bg-white">
                <Calendar size={18} className="text-gray-500" />
                <select
                  name="yearEstablished"
                  onChange={handleChange}
                  className="w-full py-3 outline-none text-sm"
                >
                  <option value="">Year Established</option>
                  {Array.from({ length: 30 }).map((_, i) => {
                    const year = 2026 - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-800">
              Contact & Account
            </h2>

            <div className="grid grid-cols-3 gap-4">

              <Input icon={<User size={18} />} name="representative" placeholder="Representative Name" onChange={handleChange} />

              <Input icon={<Mail size={18} />} name="email" placeholder="Email Address" onChange={handleChange} />

              {/* PASSWORD */}
              <div className="flex items-center gap-2 border rounded-xl px-3">
                <Lock size={18} className="text-gray-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full py-3 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            </div>
          </div>

          {/* DOCUMENT UPLOAD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-800">
              Documents Upload
            </h2>

            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />

            <label
              htmlFor="fileUpload"
              className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-600"
            >
              <FileUp size={24} className="text-gray-500" />
              <p className="text-sm mt-2">Upload Registration / PAN Documents</p>
              <p className="text-xs text-gray-400">Images or PDF allowed</p>
            </label>

            {/* PREVIEW */}
            {files.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="p-2 border rounded-lg text-xs flex items-center gap-2"
                  >
                    <FileText size={14} />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MISSION LAST */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-800">
              Mission & Impact
            </h2>

            <textarea
              name="mission"
              rows={4}
              placeholder="Describe your mission and impact..."
              onChange={handleChange}
              className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition">
            Submit for Review
          </button>

          <p className="text-xs text-center text-gray-500">
            By signing up you agree to SewaSetu terms & verification policy
          </p>
        </form>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-2 border rounded-xl px-3 bg-white">
      <span className="text-gray-500">{icon}</span>
      <input {...props} className="w-full py-3 outline-none text-sm" />
    </div>
  );
}