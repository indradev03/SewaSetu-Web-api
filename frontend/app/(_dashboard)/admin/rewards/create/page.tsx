"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RewardForm from "../../components/rewards/RewardForm";

export default function CreateRewardPage() {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <ToastContainer />

      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
          Create Reward
        </h1>
        <p className="text-gray-500 mt-2">
          Add a new reward for donors to redeem.
        </p>
      </div>

      <RewardForm mode="create" />
    </div>
  );
}
