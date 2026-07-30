"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, User } from "lucide-react";
import Button from "@/app/components/ui/button";
import donorImage from "@/app/assets/donor-role-selection.png";
import { forgotPasswordAction } from "@/app/lib/actions/auth.actions";

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = (searchParams.get("type") as "donor" | "ngo") || "donor";

  const [selectedUserType, setSelectedUserType] = useState<"donor" | "ngo">(userType);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = await forgotPasswordAction({ email }, selectedUserType);

      if (result.success) {
        toast.success("Reset code sent to your email!");
        router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}&type=${selectedUserType}`);
      } else {
        setErrors(result.errors);
        toast.error(result.errors.root || "Failed to send reset code");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputWrapperClass = (fieldKey: string) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl border bg-slate-50/50 transition-all duration-200
     focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500
     ${errors.root || errors[fieldKey] ? "border-red-400 bg-red-50/30 focus-within:ring-red-500/10 focus-within:border-red-400" : "border-slate-200"}`;

  return (
    <div className="min-h-screen w-full mt-10 flex items-center justify-center p-4 sm:p-6 md:p-8 text-slate-800">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-140">
        {/* Left Column: Image Showcase Panel */}
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-8 overflow-hidden bg-emerald-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />

          <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
            <Image
              src={donorImage}
              alt="SewaSetu Ecosystem Interface"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/85 to-transparent z-10" />

          <div className="relative z-20 flex flex-col h-full justify-between">
            <Link
              href="/"
              className="inline-block active:scale-98 transition-transform"
            >
              <Image
                src="/logo.png"
                alt="SewaSetu Logo"
                width={125}
                height={40}
                className="brightness-0 invert object-contain"
              />
            </Link>

            <div className="space-y-2.5 mb-2">
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                Reset your password
              </h2>
              <p className="text-xs text-emerald-200/70 leading-relaxed max-w-xs">
                Enter your email address and we'll send you a verification code to reset your password.
              </p>
            </div>

            <div className="text-[10px] text-emerald-300/40 font-medium tracking-wide uppercase">
              &copy; {new Date().getFullYear()} SewaSetu Hub
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-14">
          {/* Mobile Branding */}
          <div className="flex flex-col items-center mb-6 md:hidden text-center space-y-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="SewaSetu Logo"
                width={110}
                height={35}
                className="object-contain"
              />
            </Link>
            <p className="text-[11px] text-slate-400 font-medium">
              Connecting kindness with necessity for a better world.
            </p>
          </div>

          {/* Header */}
          <div className="mb-6 text-center space-y-0.5">
            <h1 className="text-2xl font-extrabold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-sm text-slate-500 font-bold">
              No worries, we'll send you reset instructions
            </p>
          </div>

          {errors.root && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium text-center animate-in fade-in duration-200">
              {errors.root}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-0.5">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUserType("donor")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                    ${selectedUserType === "donor"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                >
                  <User className="w-4 h-4" />
                  Donor
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUserType("ngo")}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                    ${selectedUserType === "ngo"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                >
                  <User className="w-4 h-4" />
                  NGO
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-0.5">
                Email Address
              </label>
              <div className={inputWrapperClass("email")}>
                <Mail className="text-emerald-600 w-4 h-4 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                variant="green"
                className="w-full font-bold py-3 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-emerald-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
