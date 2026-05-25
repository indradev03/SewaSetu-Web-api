"use client";

import { useState } from "react";
import Link from "next/link";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("NGO data:", form);
  };

  return (
    <div className="min-h-screen bg-[#f5f8f3] px-4 pt-24 pb-10 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Partner with <span className="text-green-700">SewaSetu</span>
        </h1>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Join a network of trusted organizations dedicated to making impact.
        </p>

        {/* Verification Box */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
          <h3 className="font-semibold text-blue-700">
            Verification Process
          </h3>
          <p className="text-sm text-blue-600 mt-1">
            Our team reviews NGO documents within 3–5 business days to ensure transparency.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Organization Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">
              Organization Details
            </h2>

            <input
              name="orgName"
              placeholder="Full Organization Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="regNumber"
                placeholder="Registration Number (80G/12A)"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />

              <select
                name="yearEstablished"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select Year</option>
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

          {/* Documentation */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">
              Required Documentation
            </h2>
            <p className="text-xs text-gray-500">
              Upload PDF or JPEG files (max 5MB)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 cursor-pointer">
                <p className="text-sm font-medium">
                  Registration Certificate
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to browse or drag & drop
                </p>
              </div>

              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 cursor-pointer">
                <p className="text-sm font-medium">PAN Certificate</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to browse or drag & drop
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">
              Contact & Account
            </h2>

            <input
              name="representative"
              placeholder="Representative Full Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Official Email Address"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Mission */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">
              Mission & Impact
            </h2>

            <textarea
              name="mission"
              rows={4}
              placeholder="Describe your organization's goals, projects, and communities you serve..."
              onChange={handleChange}
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />

            <p className="text-xs text-gray-400">
              This will be visible on your public profile once approved.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Submit for Review
          </button>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500">
            By joining, you agree to SewaSetu’s Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}