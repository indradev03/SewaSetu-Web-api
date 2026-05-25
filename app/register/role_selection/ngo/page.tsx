"use client";

import { useState } from "react";
import Link from "next/link";

export default function NGOSignup() {
  const [form, setForm] = useState({
    orgName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("NGO data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ed] px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-2xl font-bold text-orange-500 mb-6">
          NGO Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="orgName"
            placeholder="Organization Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Register NGO
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already registered?{" "}
          <Link href="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}