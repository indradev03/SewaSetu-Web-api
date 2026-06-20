"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, MapPin, Phone, Eye, EyeOff } from "lucide-react";

export default function DonorRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    address: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Terms validation
    if (!form.terms) {
      setError("Please accept the terms and conditions");
      return;
    }

    // Password match validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    // ✅ Here you can later connect API
    // For now just simulate success
    console.log("Form submitted:", form);

    router.push("/login");
  };

  const inputClass =
    "w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 p-8 rounded-3xl">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Join us as a Donor and start making impact
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className={inputClass}
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
                required
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                className={inputClass}
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
                required
                className="w-full pl-10 pr-10 p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-gray-400">(optional)</span>
              </p>
              <div className="flex gap-4">
                {["male", "female", "other"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      onChange={handleChange}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <span className="text-sm capitalize text-gray-700">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="address"
                placeholder="Address (optional)"
                onChange={handleChange}
                className={inputClass}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={form.password !== form.confirmPassword}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
            >
              Create Account
            </button>
          </form>

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