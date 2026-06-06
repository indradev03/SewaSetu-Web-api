"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, MapPin, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 p-8 rounded-3xl">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Join us and start making meaningful impact
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900
                placeholder:text-gray-400
                focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900
                placeholder:text-gray-400
                focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 tracking-wide
                placeholder:text-gray-400
                focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="location"
                placeholder="City, Country"
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900
                placeholder:text-gray-400
                focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                name="terms"
                onChange={handleChange}
                className="mt-1 accent-emerald-600"
              />
              <span>
                I agree to the{" "}
                <span className="text-emerald-700 font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-emerald-700 font-medium">
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}