"use client";

import "../../../globals.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { registerDonorAction } from "@/app/lib/actions/donor.actions";
import { DonorRegisterInput } from "@/app/lib/schemas/donor-auth.schema";
import Button from "@/app/components/ui/button";

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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGenderChange = (gender: "male" | "female" | "other") => {
    setForm((prev) => ({ ...prev, gender }));
    if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await registerDonorAction(form as DonorRegisterInput);
    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      toast.error(
        result.errors.root || "Registration failed. Please check the fields.",
      );
      return;
    }

    toast.success("Account created successfully");
    router.push("/login");
  };

  const inputWrapperClass = (field: string) =>
    `flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 transition-all duration-200
     focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500
     ${errors[field] ? "border-red-400 bg-red-50/30 focus-within:ring-red-500/10 focus-within:border-red-400" : "border-slate-200"}`;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-20 text-slate-800 antialiased">
      {/* Header */}
      <div className="text-center max-w-2xl pt-10 mx-auto mb-8 w-full space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Donor Registration{" "}
          <span className="text-emerald-600 bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent-600">
            SewaSetu
          </span>
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Join us as a Donor and start making a meaningful impact today.
        </p>
      </div>

      {/* Main Card Wrapper */}
      <div className="w-full max-w-2xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 rounded-3xl p-6 sm:p-10 md:p-12">
        {errors.root && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium animate-in fade-in duration-200">
            {errors.root}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Full Name
              </label>
              <div className={inputWrapperClass("fullName")}>
                <User className="text-emerald-600 w-5 h-5 shrink-0" />
                <input
                  name="fullName"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Username
              </label>
              <div className={inputWrapperClass("username")}>
                <span className="text-emerald-600 text-sm select-none font-bold">
                  @
                </span>
                <input
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.username}
                </p>
              )}
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Email Address
              </label>
              <div className={inputWrapperClass("email")}>
                <Mail className="text-emerald-600 w-5 h-5 shrink-0" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Phone Number
              </label>
              <div className={inputWrapperClass("phoneNumber")}>
                <Phone className="text-emerald-600 w-5 h-5 shrink-0" />
                <input
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Section: Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Password
              </label>
              <div className={inputWrapperClass("password")}>
                <Lock className="text-emerald-600 w-5 h-5 shrink-0" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-emerald-600 transition p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
                Confirm Password
              </label>
              <div className={inputWrapperClass("confirmPassword")}>
                <Lock className="text-emerald-600 w-5 h-5 shrink-0" />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <hr className="border-slate-100 my-2" />

          {/* Section: Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["male", "female", "other"] as const).map((g) => {
                const isSelected = form.gender === g;
                return (
                  <label
                    key={g}
                    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold border capitalize cursor-pointer transition-all duration-200 select-none
                      ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/30 text-emerald-700 ring-2 ring-emerald-600/10"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={isSelected}
                      onChange={() => handleGenderChange(g)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200
                        ${
                          isSelected
                            ? "border-emerald-600 bg-white"
                            : "border-slate-300 bg-white"
                        }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      )}
                    </div>
                    <span>{g}</span>
                  </label>
                );
              })}
            </div>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                {errors.gender}
              </p>
            )}
          </div>

          {/* Section: Address */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 pl-0.5">
              Address
            </label>
            <div className={inputWrapperClass("address")}>
              <MapPin className="text-emerald-600 w-5 h-5 shrink-0" />
              <input
                name="address"
                placeholder="Enter your address"
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* Section: Terms Agreement */}
          <div
            className={`p-4 rounded-xl border transition-all duration-200 ${
              form.terms
                ? "bg-emerald-50/30 border-emerald-500/40"
                : "bg-slate-50/50 border-slate-200"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0
                ${
                  form.terms
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 bg-white group-hover:border-emerald-500"
                }`}
              >
                {form.terms && (
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
              <span className="text-xs text-slate-500 leading-normal font-medium">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-500 mt-1.5 font-medium pl-1">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading || !form.terms}
              variant="green"
              className="w-full font-bold py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
            >
              {loading ? "Creating account…" : "Create Donor Account"}
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center mt-8 text-slate-500 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-extrabold hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
