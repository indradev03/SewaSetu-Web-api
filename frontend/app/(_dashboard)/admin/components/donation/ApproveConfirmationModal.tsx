"use client";

import { X } from "lucide-react";
import Button from "../../../../components/ui/button";

interface ApproveConfirmationModalProps {
  open: boolean;
  processing: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ApproveConfirmationModal({
  open,
  processing,
  onClose,
  onConfirm,
}: ApproveConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-4xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Approve Donation</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          Are you sure you want to approve this donation?
        </p>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1 rounded-xl text-sm py-2.5"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            variant="green"
            className="flex-1 rounded-xl text-sm py-2.5"
            disabled={processing}
          >
            {processing ? "Approving..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
