"use client";

import { useEffect, useState } from "react";
import { Donor, getDonorProfileApi } from "@/app/lib/api/donor.api";
import { updateDonorProfileAction } from "@/app/lib/actions/donor.actions";
// 1. Import toast and ToastContainer
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  User,
  Phone,
  MapPin,
  Mail,
  Camera,
  Circle,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Added a saving state for UX

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDonorProfileApi();
        const d = res.data;

        setUser(d);
        setFullName(d.fullName || "");
        setPhoneNumber(d.phoneNumber || "");
        setAddress(d.address || "");
        setGender(d.gender || "");
      } catch (err) {
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const image =
    preview ||
    (user?.profileImage
      ? `/uploads/profile/${user.profileImage}?t=${Date.now()}`
      : "/default.png");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    if (gender) formData.append("gender", gender);
    if (file) formData.append("image", file);

    try {
      const res = await updateDonorProfileAction(formData);

      if (res.success) {
        setUser(res.data!.donor);
        setIsEditing(false);
        setFile(null);
        setPreview(null);
        // 2. Trigger success toast
        toast.success("Profile updated successfully!");

        // 🔥 BROADCAST THE INSTANT CHANGE TO THE SIDEBAR
        window.dispatchEvent(new Event("profile-updated"));
      } else {
        // 3. Trigger error toast if backend action returns success: false
        const errorMsg = res.errors
          ? Object.values(res.errors)[0]
          : "Failed to update profile.";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        <div className="animate-pulse font-medium">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans antialiased text-gray-800">
      {/* 4. Add the ToastContainer to render the notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 font-serif">
            Profile Settings
          </h1>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* LEFT PROFILE CARD */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
                Donor Profile
              </p>

              {/* AVATAR CONTAINER */}
              <div className="relative group mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-gray-100 shadow-inner bg-gray-100">
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </div>

                {/* CIRCULAR EDIT BUTTON */}
                {isEditing && (
                  <label className="absolute bottom-1 right-1 bg-white border border-gray-100 text-emerald-600 p-3 rounded-full cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition duration-200 flex items-center justify-center">
                    <Camera size={18} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setFile(f);
                        setPreview(URL.createObjectURL(f));
                      }}
                    />
                  </label>
                )}
              </div>

              {/* NAME & EMAIL */}
              <h2 className="text-2xl font-medium text-gray-900 font-serif">
                {user?.fullName || "Anonymous User"}
              </h2>
              <p className="text-sm text-gray-500/90 mt-1">{user?.email}</p>

              {/* STATUS BADGE */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                <Circle
                  size={6}
                  className="fill-emerald-500 stroke-emerald-500 animate-pulse"
                />
                Verified {user?.role || "Donor"}
              </span>

              {/* TRIGGER BUTTON */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={isSaving}
                className={`mt-8 w-full py-3.5 rounded-[1.5rem] text-sm font-medium tracking-wide transition duration-300
                  ${
                    isEditing
                      ? "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 shadow-sm"
                      : "bg-[#2d7d53] text-white hover:bg-[#236341] shadow-[0_4px_16px_rgba(45,125,83,0.2)]"
                  }`}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>

            {/* LOWER STATS BADGE */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <span className="text-sm text-gray-600 font-medium">
                Account Status
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-800 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                Active
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT CARD */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium text-gray-900 font-serif">
                    Personal Information
                  </h3>
                </div>

                {!isEditing ? (
                  /* VIEW MODE */
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InfoCard
                      icon={<User size={18} />}
                      label="Full Name"
                      value={user?.fullName}
                    />
                    <InfoCard
                      icon={<Phone size={18} />}
                      label="Phone Number"
                      value={user?.phoneNumber}
                    />
                    <InfoCard
                      icon={<MapPin size={18} />}
                      label="Address"
                      value={user?.address}
                    />
                    <InfoCard
                      icon={<User size={18} />}
                      label="Gender"
                      value={user?.gender}
                    />
                    <div className="sm:col-span-2">
                      <InfoCard
                        icon={<Mail size={18} />}
                        label="Email Address"
                        value={user?.email}
                      />
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE FORM */
                  <form
                    onSubmit={handleUpdate}
                    id="profileForm"
                    className="grid sm:grid-cols-2 gap-5"
                  >
                    <InputField
                      icon={<User size={18} />}
                      label="Full Name"
                      value={fullName}
                      setValue={setFullName}
                    />
                    <InputField
                      icon={<Phone size={18} />}
                      label="Phone Number"
                      value={phoneNumber}
                      setValue={setPhoneNumber}
                    />
                    <div className="sm:col-span-2">
                      <InputField
                        icon={<MapPin size={18} />}
                        label="Address"
                        value={address}
                        setValue={setAddress}
                      />
                    </div>

                    {/* RADIO GENDER INPUTS */}
                    <div className="sm:col-span-2 flex flex-col mt-2">
                      <label className="text-xs text-gray-400 font-semibold tracking-wide mb-3 uppercase">
                        Gender
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {(["male", "female", "other"] as const).map((g) => (
                          <label
                            key={g}
                            className={`flex items-center justify-center gap-3 py-3 px-4 rounded-2xl text-sm font-medium cursor-pointer transition border uppercase tracking-wider
                              ${
                                gender === g
                                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-800"
                                  : "bg-gray-50 border-gray-200/60 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={gender === g}
                              onChange={() => setGender(g)}
                              className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 focus:ring-offset-0"
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* ACTION LOWER BAR */}
              <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-emerald-800 font-medium bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Available for donations and collaboration
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={isSaving}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#2d7d53] text-white font-medium rounded-full hover:bg-[#236341] transition shadow-[0_4px_16px_rgba(45,125,83,0.2)] text-sm tracking-wide disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STRUCTURAL UI SUB-COMPONENTS ---------- */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="bg-emerald-50/30 border border-emerald-100/40 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
        {label}
      </span>
      <div className="flex items-center gap-3 mt-1">
        <div className="text-emerald-600 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-gray-800 font-medium capitalize">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

function InputField({
  icon,
  label,
  value,
  setValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-emerald-600 flex items-center justify-center">
          {icon}
        </div>
        <input
          className="w-full bg-gray-50 border border-gray-200/60 text-gray-700 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 focus:bg-white focus:outline-none transition duration-200"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}
