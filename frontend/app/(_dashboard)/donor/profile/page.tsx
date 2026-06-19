"use client";

import { useEffect, useState } from "react";
import { Donor, getDonorProfileApi } from "@/app/lib/api/donor.api";
import {
  updateDonorProfileAction,
  changePasswordAction,
} from "@/app/lib/actions/donor.actions";
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
  Lock,
  X,
  Eye,
  EyeOff,
  AtSign,
} from "lucide-react";
import Button from "@/app/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile data states
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ── Change Password state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await getDonorProfileApi();
        const d = res.data;

        setUser(d);
        setUsername(d.username || "");
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
        toast.success("Profile updated successfully!");
        window.dispatchEvent(new Event("profile-updated"));
      } else {
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

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowCurrentPw(false);
    setShowNewPw(false);
    setShowConfirmPw(false);
    setPasswordErrors({});
  };

  const closePasswordModal = () => {
    if (isChangingPassword) return;
    setShowPasswordModal(false);
    resetPasswordForm();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});
    setIsChangingPassword(true);

    try {
      const res = await changePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword: confirmNewPassword,
      });

      if (res.success) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        resetPasswordForm();
      } else {
        setPasswordErrors(res.errors || {});
        const errorMsg = res.errors
          ? Object.values(res.errors)[0]
          : "Failed to change password.";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsChangingPassword(false);
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
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
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-emerald-500 shadow-outer bg-grey-100">
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </div>

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
              <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
                @{username}
              </p>
              <p className="text-sm text-gray-500/90 mt-1.5">{user?.email}</p>

              {/* STATUS BADGE */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                <Circle
                  size={6}
                  className="fill-emerald-500 stroke-emerald-500 animate-pulse"
                />
                Verified {user?.role || "Donor"}
              </span>

              {/* DYNAMIC EDIT / CANCEL BUTTON */}
              <div className="mt-8 w-full">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isSaving}
                  variant={isEditing ? "secondary" : "green"}
                  className="!rounded-[1.5rem]"
                >
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </Button>
              </div>

              {/* CHANGE PASSWORD TRIGGER BUTTON */}
              <div className="mt-3 w-full">
                <Button
                  onClick={() => setShowPasswordModal(true)}
                  disabled={isSaving}
                  variant="orange"
                  className="!rounded-[1.5rem] flex items-center justify-center gap-2"
                >
                  <Lock size={16} />
                  Change Password
                </Button>
              </div>
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
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 font-serif">
                    Personal Information
                  </h3>
                </div>

                {!isEditing ? (
                  /* ELEVATED VIEW MODE */
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                      {/* FULL NAME */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-0.5">
                          <User size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Full Name
                          </span>
                          <span className="text-base font-medium text-gray-900">
                            {fullName || "—"}
                          </span>
                        </div>
                      </div>

                      {/* USERNAME */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-0.5">
                          <AtSign size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                            Username
                          </span>
                          <span className="inline-flex items-center text-sm font-mono font-medium text-emerald-700 bg-emerald-50/60 px-2.5 py-0.5 rounded-md border border-emerald-100/50">
                            @{username || "—"}
                          </span>
                        </div>
                      </div>

                      {/* PHONE NUMBER */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition group">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-0.5">
                          <Phone size={18} />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Phone Number
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-gray-800 tracking-wide">
                              {phoneNumber || "—"}
                            </span>
                            {phoneNumber && (
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(phoneNumber);
                                  toast.info("Copied phone number!");
                                }}
                                className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition px-2 py-0.5 bg-emerald-50 rounded hover:bg-emerald-100"
                              >
                                Copy
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-0.5">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Address
                          </span>
                          <span className="text-base font-medium text-gray-800">
                            {address || "—"}
                          </span>
                        </div>
                      </div>

                      {/* GENDER */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mt-0.5">
                          <User size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                            Gender
                          </span>
                          {gender ? (
                            <span
                              className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium border uppercase tracking-wider ${
                                gender === "male"
                                  ? "bg-blue-50 border-blue-100 text-blue-700"
                                  : gender === "female"
                                    ? "bg-pink-50 border-pink-100 text-pink-700"
                                    : "bg-purple-50 border-purple-100 text-purple-700"
                              }`}
                            >
                              {gender}
                            </span>
                          ) : (
                            <span className="text-base font-medium text-gray-400">
                              —
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div className="mt-4 pt-4 border-t border-gray-100/70">
                      <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between group hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4">
                          <div className="bg-white border border-gray-200/60 text-gray-500 p-3 rounded-xl shadow-sm">
                            <Mail size={18} />
                          </div>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                              Primary Email Address
                            </span>
                            <span className="text-sm md:text-base font-medium text-gray-900">
                              {user?.email || "—"}
                            </span>
                          </div>
                        </div>
                        {user?.email && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(user.email);
                              toast.info("Copied email address!");
                            }}
                            className="text-xs text-gray-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl hover:bg-gray-50 transition"
                          >
                            Copy Link
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE FORM */
                  <form
                    onSubmit={handleUpdate}
                    id="profileForm"
                    className="grid sm:grid-cols-2 gap-5"
                  >
                    <div className="opacity-60">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Username (Locked)
                      </label>
                      <input
                        type="text"
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-3 rounded-2xl text-sm cursor-not-allowed"
                        value={username}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200/60 text-gray-700 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 focus:bg-white focus:outline-none transition"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200/60 text-gray-700 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 focus:bg-white focus:outline-none transition"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200/60 text-gray-700 px-4 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 focus:bg-white focus:outline-none transition"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="opacity-60 sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Email Address (Locked)
                      </label>
                      <input
                        type="text"
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-3 rounded-2xl text-sm cursor-not-allowed"
                        value={user?.email || ""}
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
                <div className="flex items-center gap-2.5 text-xs md:text-sm text-emerald-800 font-medium bg-emerald-50/60 border border-emerald-100/50 px-4 py-2.5 rounded-xl">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600 shrink-0"
                  />
                  Available for donations and collaboration
                </div>

                {isEditing && (
                  <div className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      form="profileForm"
                      disabled={isSaving}
                      variant="green"
                      className="!px-8 !py-3.5 !rounded-full text-sm tracking-wide shadow-md shadow-emerald-600/10"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] p-8 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={closePasswordModal}
              disabled={isChangingPassword}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-50 border border-amber-100 text-orange-600 p-3 rounded-2xl">
                <Lock size={20} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 font-serif">
                Change Password
              </h3>
            </div>

            <form
              onSubmit={handleChangePassword}
              className="flex flex-col gap-4"
            >
              <PasswordField
                label="Current Password"
                value={currentPassword}
                setValue={setCurrentPassword}
                show={showCurrentPw}
                setShow={setShowCurrentPw}
                error={passwordErrors.currentPassword}
              />
              <PasswordField
                label="New Password"
                value={newPassword}
                setValue={setNewPassword}
                show={showNewPw}
                setShow={setShowNewPw}
                error={passwordErrors.newPassword}
              />
              <PasswordField
                label="Confirm New Password"
                value={confirmNewPassword}
                setValue={setConfirmNewPassword}
                show={showConfirmPw}
                setShow={setShowConfirmPw}
                error={passwordErrors.confirmPassword}
              />

              {passwordErrors.root && (
                <p className="text-xs text-red-500 font-medium -mt-1">
                  {passwordErrors.root}
                </p>
              )}

              <div className="flex gap-3 mt-2">
                <Button
                  type="button"
                  onClick={closePasswordModal}
                  disabled={isChangingPassword}
                  variant="secondary"
                  className="!rounded-[1.5rem]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  variant="orange"
                  className="!rounded-[1.5rem]"
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- PASSWORDS INPUT INTERNAL FIELD ---------- */

function PasswordField({
  label,
  value,
  setValue,
  show,
  setShow,
  error,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-orange-500 flex items-center justify-center">
          <Lock size={18} />
        </div>
        <input
          type={show ? "text" : "password"}
          className={`w-full bg-gray-50 border text-gray-700 pl-12 pr-12 py-3.5 rounded-2xl text-sm focus:ring-2 focus:bg-white focus:outline-none transition duration-200 ${
            error
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200/60 focus:ring-orange-200"
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-1.5">{error}</span>
      )}
    </div>
  );
}
