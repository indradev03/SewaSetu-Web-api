"use client";

import { useState } from "react";
import { createDonationAction } from "@/app/lib/actions/donation.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Package, MapPin, Plus, X, Upload, Sparkles, Loader2 } from "lucide-react";
import Button from "@/app/components/ui/button";
import { generateDonationItemApi } from "@/app/lib/api/ai.api";

export default function CreateDonation() {
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > 5) {
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

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
  };

  const handleAIAnalysis = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAiAnalyzing(true);
    try {
      const res = await generateDonationItemApi(file);
      
      if (res.success) {
        setFormData({
          ...formData,
          category: res.data.category,
          title: res.data.title,
          description: res.data.description,
          quantity: res.data.quantity.toString(),
          unit: res.data.unit,
        });
        
        toast.success(`AI analyzed image with ${res.data.confidence}% confidence!`);
        
        // Also add the image to photos
        const newFiles = [...photos, file];
        const newPreviews = [
          ...previews,
          URL.createObjectURL(file),
        ];
        setPhotos(newFiles);
        setPreviews(newPreviews);
      } else {
        toast.error(res.message || "Failed to analyze image");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to analyze image with AI");
    } finally {
      setAiAnalyzing(false);
      // Reset the input
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("unit", formData.unit);
    data.append("pickupAddress", formData.pickupAddress);

    photos.forEach((photo) => {
      data.append("photos", photo);
    });

    try {
      const res = await createDonationAction(data);

      if (res.success) {
        toast.success("Donation created successfully!");
        setFormData({
          category: "Food",
          title: "",
          description: "",
          quantity: "",
          unit: "Kgs",
          pickupAddress: "",
        });
        setPhotos([]);
        setPreviews([]);
      } else {
        const errorMsg = res.errors
          ? Object.values(res.errors)[0]
          : "Failed to create donation";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8 font-sans antialiased text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-8xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            Create Donation
          </h1>
          <p className="text-gray-500 mt-2">
            Share your items with those in need
          </p>
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

            {/* AI Auto-fill Feature */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500 text-white p-2 rounded-xl">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">AI Auto-fill</h3>
                  <p className="text-xs text-emerald-700">Upload an image to automatically fill donation details</p>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAIAnalysis}
                  disabled={aiAnalyzing}
                  className="hidden"
                  id="ai-upload"
                />
                <label
                  htmlFor="ai-upload"
                  className={`flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold cursor-pointer transition-all border-2
                    ${
                      aiAnalyzing
                        ? "bg-emerald-100 border-emerald-300 text-emerald-600 cursor-not-allowed"
                        : "bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400"
                    }`}
                >
                  {aiAnalyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Analyzing image...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Upload image for AI analysis</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Photos Upload */}
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 block">
                Photos (Optional - Max 5)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-emerald-300 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full mb-3">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    Click to upload photos
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5 files
                  </span>
                </label>
              </div>

              {/* Photo Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
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
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                variant="green"
                className="w-full py-4 rounded-2xl text-base font-semibold shadow-md shadow-emerald-600/10"
              >
                {loading ? "Creating Donation..." : "Create Donation"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
