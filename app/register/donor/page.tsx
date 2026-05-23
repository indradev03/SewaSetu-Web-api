"use client";

import { useState } from "react";
import Link from "next/link";

export default function DonorSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donor data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ed] px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Donor Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}