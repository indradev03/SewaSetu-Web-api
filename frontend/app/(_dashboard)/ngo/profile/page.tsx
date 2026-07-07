"use client";

import { useEffect, useState } from "react";
import { NGO, getNgoProfileApi } from "@/app/lib/api/ngo.api";
import {
  updateNgoProfileAction,
  changePasswordAction,
} from "@/app/lib/actions/ngo.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Building2,
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
  FileText,
  Calendar,
} from "lucide-react";
import Button from "@/app/components/ui/button";

export default function NGOProfilePage() {
  const [user, setUser] = useState<NGO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile data states
  const [organizationName, setOrganizationName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [impactDescription, setImpactDescription] = useState("");
  const [address, setAddress] = useState("");

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
        const res = await getNgoProfileApi();
        const d = res.data;

        setUser(d);
        setOrganizationName(d.organizationName || "");
        setContactPerson(d.contactPerson || "");
        setImpactDescription(d.impactDescription || "");
        setAddress(d.address || "");
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
    formData.append("organizationName", organizationName);
    formData.append("contactPerson", contactPerson);
    formData.append("impactDescription", impactDescription);
    formData.append("address", address);
    if (file) formData.append("image", file);

    try {
      const res = await updateNgoProfileAction(formData);

      if (res.success) {
        setUser(res.data!.ngo);
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
      <div className="min-h-screen flex items-center justify-center text-green-700">
        <div className="animate-pulse font-medium">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8 font-sans antialiased text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-8xl mx-auto">
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
                NGO Profile
              </p>

              {/* AVATAR CONTAINER */}
              <div className="relative group mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-green-500 shadow-inner bg-gray-100">
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </div>

                {isEditing && (
                  <label className="absolute bottom-1 right-1 bg-white border border-gray-100 text-green-600 p-3 rounded-full cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition duration-200 flex items-center justify-center">
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
                {user?.organizationName || "Anonymous NGO"}
              </h2>
              <p className="text-sm text-gray-500/90 mt-1.5">{user?.email}</p>

              {/* STATUS BADGE */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs bg-green-50 border border-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                <Circle
                  size={6}
                  className={`fill-green-500 stroke-green-500 ${user?.isVerified ? "" : "animate-pulse"}`}
                />
                {user?.isVerified ? "Verified NGO" : "Pending Verification"}
              </span>

              {/* DYNAMIC EDIT / CANCEL BUTTON */}
              <div className="mt-8 w-full">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isSaving}
                  variant={isEditing ? "secondary" : "green"}
                  className={`rounded-2xl ${
                    !isEditing ? "bg-green-500 hover:bg-green-400" : ""
                  }`}
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
                  className="rounded-2xl! flex items-center justify-center gap-2"
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
              <span className="text-xs bg-green-500/10 text-green-800 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                Active
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT CARD */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] min-h-112 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-green-600 font-serif">
                    Organization Information
                  </h3>
                </div>

                {!isEditing ? (
                  /* VIEW MODE */
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                      {/* ORGANIZATION NAME */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-green-50 text-green-600 p-2.5 rounded-xl mt-0.5">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Organization Name
                          </span>
                          <span className="text-base font-medium text-gray-900">
                            {organizationName || "—"}
                          </span>
                        </div>
                      </div>

                      {/* CONTACT PERSON */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-green-50 text-green-600 p-2.5 rounded-xl mt-0.5">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Contact Person
                          </span>
                          <span className="text-base font-medium text-gray-900">
                            {contactPerson || "—"}
                          </span>
                        </div>
                      </div>

                      {/* REGISTRATION NUMBER */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-green-50 text-green-600 p-2.5 rounded-xl mt-0.5">
                          <FileText size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Registration Number
                          </span>
                          <span className="text-base font-medium text-gray-800 tracking-wide">
                            {user?.registrationNumber || "—"}
                          </span>
                        </div>
                      </div>

                      {/* YEAR ESTABLISHED */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-green-50 text-green-600 p-2.5 rounded-xl mt-0.5">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                            Year Established
                          </span>
                          <span className="text-base font-medium text-gray-800">
                            {user?.yearEstablished || "—"}
                          </span>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition">
                        <div className="bg-green-50 text-green-600 p-2.5 rounded-xl mt-0.5">
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
                    </div>

                    {/* IMPACT DESCRIPTION */}
                    <div className="mt-4 pt-4 border-t border-gray-100/70">
                      <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="bg-white border border-gray-200/60 text-gray-500 p-3 rounded-xl shadow-sm">
                            <FileText size={18} />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Impact Description
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed pl-14">
                          {impactDescription || "No description provided."}
                        </p>
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
                              Email Address
                            </span>
                            <span className="text-sm md:text-base font-medium text-gray-900">
                              {user?.email || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENTS SECTION */}
                    <div className="mt-4 pt-4 border-t border-gray-100/70">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white border border-gray-200/60 text-gray-500 p-3 rounded-xl shadow-sm">
                          <FileText size={18} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Documents
                        </span>
                      </div>
                      <div className="pl-14 grid sm:grid-cols-2 gap-4">
                        {/* Registration Document Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 text-green-600 p-3 rounded-xl">
                              <FileText size={20} />
                            </div>
                            {user?.registrationDocPath ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                Uploaded
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                                Pending
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            Registration Document
                          </h4>
                          <p className="text-xs text-gray-500 mb-4">
                            Official registration certificate
                          </p>
                          {user?.registrationDocPath ? (
                            <div className="flex gap-2">
                              <a
                                href={`/uploads/documents/${user.registrationDocPath.split("/").pop()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center text-sm bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                              >
                                <Eye size={14} />
                                View
                              </a>
                            </div>
                          ) : (
                            <div className="text-center py-2.5 bg-gray-50 rounded-xl">
                              <span className="text-xs text-gray-400">
                                Document not uploaded
                              </span>
                            </div>
                          )}
                        </div>

                        {/* PAN Card Document Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 p-3 rounded-xl">
                              <FileText size={20} />
                            </div>
                            {user?.panCardPath ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                Uploaded
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                                Pending
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            PAN Card
                          </h4>
                          <p className="text-xs text-gray-500 mb-4">
                            Permanent Account Number card
                          </p>
                          {user?.panCardPath ? (
                            <div className="flex gap-2">
                              <a
                                href={`/uploads/documents/${user.panCardPath.split("/").pop()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center text-sm bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                              >
                                <Eye size={14} />
                                View
                              </a>
                            </div>
                          ) : (
                            <div className="text-center py-2.5 bg-gray-50 rounded-xl">
                              <span className="text-xs text-gray-400">
                                Document not uploaded
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE FORM */
                  <form
                    onSubmit={handleUpdate}
                    id="profileForm"
                    className="grid sm:grid-cols-2 gap-6"
                  >
                    {/* ORGANIZATION NAME */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Organization Name
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <Building2 size={16} />
                        </div>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 text-gray-800 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:outline-none transition duration-200"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="Enter organization name"
                        />
                      </div>
                    </div>

                    {/* CONTACT PERSON */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Contact Person
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <Building2 size={16} />
                        </div>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 text-gray-800 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:outline-none transition duration-200"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder="Contact person name"
                        />
                      </div>
                    </div>

                    {/* REGISTRATION NUMBER (LOCKED) */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Registration Number (Locked)
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <Lock size={16} />
                        </div>
                        <input
                          type="text"
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 text-gray-400/80 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium cursor-not-allowed select-none transition"
                          value={user?.registrationNumber || ""}
                        />
                      </div>
                    </div>

                    {/* YEAR ESTABLISHED (LOCKED) */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Year Established (Locked)
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <Lock size={16} />
                        </div>
                        <input
                          type="text"
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 text-gray-400/80 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium cursor-not-allowed select-none transition"
                          value={user?.yearEstablished || ""}
                        />
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Address
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 text-gray-800 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:outline-none transition duration-200"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    {/* EMAIL ADDRESS (LOCKED) */}
                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Email Address (Locked)
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 flex items-center justify-center">
                          <Lock size={16} />
                        </div>
                        <input
                          type="text"
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 text-gray-400/80 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium cursor-not-allowed select-none transition"
                          value={user?.email || ""}
                        />
                      </div>
                    </div>

                    {/* IMPACT DESCRIPTION */}
                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                        Impact Description
                      </label>
                      <textarea
                        className="w-full bg-white border border-gray-200 text-gray-800 px-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:outline-none transition duration-200 min-h-32 resize-none"
                        value={impactDescription}
                        onChange={(e) => setImpactDescription(e.target.value)}
                        placeholder="Describe your organization's impact and mission..."
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* ACTION LOWER BAR */}
              <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs md:text-sm text-green-800 font-medium bg-green-50/60 border border-green-100/50 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                  Available for donation claims
                </div>

                {isEditing && (
                  <div className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      form="profileForm"
                      disabled={isSaving}
                      variant="green"
                      className="px-8! py-3.5! rounded-full! text-sm tracking-wide shadow-md shadow-green-600/10 bg-green-500 hover:bg-green-400"
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
          <div className="bg-white w-full max-w-md rounded-4xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] p-8 relative">
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
                  className="rounded-3xl!"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  variant="orange"
                  className="rounded-3xl!"
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
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-1.5">{error}</span>
      )}
    </div>
  );
}
