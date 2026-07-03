"use client";

import { X } from "lucide-react";
import Button from "../../../../components/ui/button";

interface RejectConfirmationModalProps {
  open: boolean;
  rejectionReason: string;
  processing: boolean;
  onClose: () => void;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export default function RejectConfirmationModal({
  open,
  rejectionReason,
  processing,
  onClose,
  onReasonChange,
  onConfirm,
}: RejectConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-4xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Reject Donation</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Enter rejection reason...
          </label>
          <textarea
            className="w-full bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-xl text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:outline-none transition resize-none"
            rows={4}
            placeholder="Please provide a reason for rejecting this donation..."
            value={rejectionReason}
            onChange={(e) => onReasonChange(e.target.value)}
          />
        </div>

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
            variant="orange"
            className="flex-1 rounded-xl text-sm py-2.5"
            disabled={processing || !rejectionReason.trim()}
          >
            {processing ? "Rejecting..." : "Confirm Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
}
