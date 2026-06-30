"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "@/app/components/ui/button";
import TextLink from "@/app/components/ui/textLink";
import { loginDonorAction } from "@/app/lib/actions/donor.actions";
import { loginNGOAction } from "@/app/lib/actions/ngo.actions";
import donorImage from "@/app/assets/donor-role-selection.png";
import { useAuth } from "@/app/lib/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { checkAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Donor login covers both "donor" and "admin" accounts — they live in
      // the same Donor collection on the backend, distinguished only by role.
      const donorResult = await loginDonorAction({ email, password });

      if (donorResult.success) {
        checkAuth();
        setLoading(false);

        if (donorResult.data.role === "admin") {
          toast.success("Welcome back, Admin!");
          router.push("/admin");
        } else {
          toast.success("Welcome back, Donor!");
          router.push("/donor");
        }
        return;
      }

      const ngoResult = await loginNGOAction({ email, password });
      setLoading(false);

      if (ngoResult.success) {
        checkAuth();
        toast.success("Welcome back, NGO Partner!");
        router.push("ngo");
        return;
      }

      setErrors({ root: "Invalid email or password parameters." });
      toast.error("Authentication failed. Please verify credentials.");
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const inputWrapperClass = (fieldKey: string) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl border bg-slate-50/50 transition-all duration-200
     focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500
     ${errors.root || errors[fieldKey] ? "border-red-400 bg-red-50/30 focus-within:ring-red-500/10 focus-within:border-red-400" : "border-slate-200"}`;

  return (
    <div className="min-h-screen w-full mt-10 flex items-center justify-center p-4 sm:p-6 md:p-8 text-slate-800">
      {/* Central Split Card Wrapper */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-140">
        {/* Left Column: Integrated Image Showcase Panel */}
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-8 overflow-hidden bg-emerald-950">
          {/* Decorative radial lighting gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />

          {/* Cover Asset Background Layer */}
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

          {/* Context content container overlay */}
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
                Bridging kindness with necessity.
              </h2>
              <p className="text-xs text-emerald-200/70 leading-relaxed max-w-xs">
                Log in to coordinate regional assets, update distribution
                logistics metrics, or review structural neighborhood campaign
                goals.
              </p>
            </div>

            <div className="text-[10px] text-emerald-300/40 font-medium tracking-wide uppercase">
              &copy; {new Date().getFullYear()} SewaSetu Hub
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Credentials Control Form */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-14">
          {/* Responsive Branding Badge for Mobile layout */}
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

          {/* Centered Welcome Header Component Area */}
          <div className="mb-6 text-center space-y-0.5">
            <h1 className="text-2xl font-extrabold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 font-bold">
              Sign in to your platform account profile
            </p>
          </div>

          {errors.root && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium text-center animate-in fade-in duration-200">
              {errors.root}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Element: Email */}
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

            {/* Input Element: Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-emerald-600 font-bold hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className={inputWrapperClass("password")}>
                <Lock className="text-emerald-600 w-4 h-4 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-emerald-600 transition p-1"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Execution CTA Trigger */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                variant="green"
                className="w-full font-bold py-3 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </div>
          </form>

          {/* Centered Footer Navigation Link */}
          <p className="text-sm mt-6 text-slate-500 font-medium text-center">
            Don&apos;t have an account?{" "}
            <TextLink
              href="/register/role_selection"
              variant="solid-green"
              className="font-extrabold text-emerald-600 hover:underline ml-0.5"
            >
              Sign up for free
            </TextLink>
          </p>
        </div>
      </div>
    </div>
  );
}
