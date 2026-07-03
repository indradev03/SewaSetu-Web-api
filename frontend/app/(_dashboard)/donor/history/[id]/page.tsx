"use client";

import { useEffect, useState } from "react";
import {
  getDonationByIdAction,
  updateDonationAction,
} from "@/app/lib/actions/donation.actions";
import { Donation } from "@/app/lib/api/donation.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Package, MapPin, Upload, X, ArrowLeft } from "lucide-react";
import Button from "@/app/components/ui/button";
import { useRouter, useParams } from "next/navigation";

export default function EditDonation() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [donation, setDonation] = useState<Donation | null>(null);
  const [formData, setFormData] = useState({
    category: "Food" as "Food" | "Clothes" | "Others",
    title: "",
    description: "",
    quantity: "",
    unit: "Kgs" as "Pieces" | "Kgs" | "Packets" | "Liters",
    pickupAddress: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchDonation(params.id as string);
    }
  }, [params.id]);

  const fetchDonation = async (id: string) => {
    setLoading(true);
    try {
      const res = await getDonationByIdAction(id);
      if (res.success) {
        const d = res.data!.donation;
        setDonation(d);
        setFormData({
          category: d.category,
          title: d.title,
          description: d.description,
          quantity: d.quantity.toString(),
          unit: d.unit,
          pickupAddress: d.pickupAddress,
        });
        setExistingPhotos(d.photos || []);
      } else {
        toast.error("Failed to fetch donation");
        router.push("/donor/history");
      }
    } catch (error) {
      toast.error("An error occurred");
      router.push("/donor/history");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalPhotos = existingPhotos.length + photos.length + files.length;

    if (totalPhotos > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    const newFiles = [...photos, ...files];
    const newPreviews = [
      ...previews,
      ...files.map((file) => URL.createObjectURL(file)),
    ];

    setPhotos(newFiles);
    setPreviews(newPreviews);
  };

  const removeNewPhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
  };

  const removeExistingPhoto = (photoPath: string) => {
    setExistingPhotos(existingPhotos.filter((p) => p !== photoPath));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("unit", formData.unit);
    data.append("pickupAddress", formData.pickupAddress);

    // Include existing photos
    existingPhotos.forEach((photo) => {
      data.append("photos", photo);
    });

    // Add new photos
    photos.forEach((photo) => {
      data.append("photos", photo);
    });

    try {
      const res = await updateDonationAction(params.id as string, data);

      if (res.success) {
        toast.success("Donation updated successfully!");
        router.push("/donor/history");
      } else {
        const errorMsg = res.errors
          ? Object.values(res.errors)[0]
          : "Failed to update donation";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        <div className="animate-pulse font-medium">Loading donation...</div>
      </div>
    );
  }

  if (!donation) {
    return null;
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans antialiased text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button
            onClick={() => router.push("/donor/history")}
            variant="secondary"
            className="rounded-full"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
              Edit Donation
            </h1>
            <p className="text-gray-500 mt-2">Update your donation details</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 block">
                Category
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(["Food", "Clothes", "Others"] as const).map((cat) => (
                  <label
                    key={cat}
                    className={`flex items-center gap-3 py-3.5 px-4 rounded-2xl text-sm font-semibold cursor-pointer transition-all border uppercase tracking-wider select-none shadow-sm
                      ${
                        formData.category === cat
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                Title
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Package size={18} />
                </div>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 text-gray-800 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Rice and Wheat Donation"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                Description
              </label>
              <textarea
                className="w-full bg-white border border-gray-200 text-gray-800 px-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition resize-none"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your donation in detail (min 10 characters)"
                required
                minLength={10}
                maxLength={200}
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.description.length}/200 characters
              </p>
            </div>

            {/* Quantity & Unit */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full bg-white border border-gray-200 text-gray-800 px-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                  Unit
                </label>
                <select
                  className="w-full bg-white border border-gray-200 text-gray-800 px-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value as any })
                  }
                  required
                >
                  <option value="Pieces">Pieces</option>
                  <option value="Kgs">Kgs</option>
                  <option value="Packets">Packets</option>
                  <option value="Liters">Liters</option>
                </select>
              </div>
            </div>

            {/* Pickup Address */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
                Pickup Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 text-gray-800 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition"
                  value={formData.pickupAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupAddress: e.target.value })
                  }
                  placeholder="Enter pickup address"
                  required
                  minLength={5}
                />
              </div>
            </div>

            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 block">
                  Current Photos
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {existingPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={`/uploads/donations/${photo}`}
                        alt={`Existing photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(photo)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Photos Upload */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 block">
                Add New Photos (Max {5 - existingPhotos.length - photos.length}{" "}
                more)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-emerald-300 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                  disabled={existingPhotos.length + photos.length >= 5}
                />
                <label
                  htmlFor="photo-upload"
                  className={`flex flex-col items-center justify-center cursor-pointer ${
                    existingPhotos.length + photos.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full mb-3">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    Click to upload photos
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to {5 - existingPhotos.length - photos.length}{" "}
                    files
                  </span>
                </label>
              </div>

              {/* New Photo Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`New preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewPhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                onClick={() => router.push("/donor/history")}
                variant="secondary"
                className="flex-1 py-4 rounded-2xl text-base font-semibold"
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                variant="green"
                className="flex-1 py-4 rounded-2xl text-base font-semibold shadow-md shadow-emerald-600/10"
              >
                {saving ? "Updating..." : "Update Donation"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
