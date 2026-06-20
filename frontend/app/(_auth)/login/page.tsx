"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/button";
import TextLink from "@/app/components/ui/textLink";
import { loginDonorAction } from "@/app/lib/actions/donor.actions";
import { loginNGOAction } from "@/app/lib/actions/ngo.actions";

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    setErrors({});
    setLoading(true);

    // Try donor first, then NGO — no role selection needed
    const donorResult = await loginDonorAction({ email, password });

    if (donorResult.success) {
      router.push("donor");
      return;
    }

    const ngoResult = await loginNGOAction({ email, password });

    setLoading(false);

    if (ngoResult.success) {
      router.push("ngo");
      return;
    }

    // Both failed — show a clean error
    setErrors({ root: "Invalid email or password." });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/logo.png"
            alt="SewaSetu Logo"
            width={150}
            height={100}
            className="object-contain h-auto w-auto"
          />
        </div>
        <p className="text-center text-sm text-gray-600 font-bold">
          Connecting kindness with necessity for a better world.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        {errors.root && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {errors.root}
          </div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={`w-full mt-1 p-3 rounded-xl text-sm border text-gray-700 bg-[#f9f9f7]
                focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-green-600 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full p-3 pr-10 rounded-xl text-sm text-gray-700 border bg-[#f9f9f7]
                  focus:outline-none focus:ring-2 focus:ring-green-700 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </div>
      </div>

      {/* Footer link */}
      <p className="text-sm mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <TextLink href="/register/role_selection" variant="solid-green">
          Sign up for free
        </TextLink>
      </p>
    </div>
  );
};

export default LoginForm;
