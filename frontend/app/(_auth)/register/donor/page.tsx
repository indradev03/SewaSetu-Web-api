"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, MapPin, Phone, Eye, EyeOff } from "lucide-react";
import {
  registerDonorAction,
  type DonorRegisterInput,
} from "@/app/lib/actions/donor.actions";

type FormState = Omit<DonorRegisterInput, "terms"> & { terms: boolean };

export default function DonorRegister() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: undefined,
    address: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Component → Action → API
    const result = await registerDonorAction(form as DonorRegisterInput);

    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    // On success → redirect to login
    router.push("/login");
  };

  const inputClass = (field: string) =>
    `w-full pl-10 p-3 rounded-xl border bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400
     focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition ${
       errors[field] ? "border-red-400" : "border-gray-200"
     }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 p-8 rounded-3xl">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Create Account</h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Join us as a Donor and start making impact
          </p>

          {/* Root API error */}
          {errors.root && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
              {errors.root}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input name="username" placeholder="Username" onChange={handleChange} required className={inputClass("username")} />
              </div>
              {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
            </div>

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required className={inputClass("fullName")} />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className={inputClass("email")} />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className={inputClass("phoneNumber")} />
              </div>
              {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-10 p-3 rounded-xl border bg-gray-50 text-sm text-gray-900
                    placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition ${
                      errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  className={inputClass("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-gray-400">(optional)</span>
              </p>
              <div className="flex gap-4">
                {(["male", "female", "other"] as const).map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value={g} onChange={handleChange} className="accent-emerald-600 w-4 h-4" />
                    <span className="text-sm capitalize text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input name="address" placeholder="Address (optional)" onChange={handleChange} className={inputClass("address")} />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input type="checkbox" name="terms" onChange={handleChange} className="mt-1 accent-emerald-600" />
                <span>
                  I agree to the{" "}
                  <span className="text-emerald-700 font-medium">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-emerald-700 font-medium">Privacy Policy</span>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold
                shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}