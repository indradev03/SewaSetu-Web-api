"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RewardForm from "../../components/rewards/RewardForm";

export default function CreateRewardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-8 space-y-6">
      <ToastContainer />

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Reward</h1>
        <p className="text-xs text-slate-400 mt-1">
          Add a new reward for donors to redeem.
        </p>
      </div>

      <RewardForm mode="create" />
    </div>
  );
}
