"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  level: string;
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  createdAt: string;
  updatedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 border-blue-200",
  Contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
  Closed: "bg-green-100 text-green-700 border-green-200",
};

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await fetch(`/api/inquiries/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setInquiry(data);
      } catch {
        setError("Inquiry not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchInquiry();
  }, [id]);

  const handleStatusChange = async (status: string) => {
    if (!inquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setInquiry((prev) => prev ? { ...prev, status: updated.status } : prev);
      showToast("Status updated successfully", "success");
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!inquiry) return;
    if (!confirm(`Delete inquiry from "${inquiry.name}"? This action cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Inquiry deleted", "success");
      setTimeout(() => router.push("/admin"), 1000);
    } catch {
      showToast("Failed to delete inquiry", "error");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{error || "Inquiry not found"}</h2>
          <Link href="/admin" className="text-blue-600 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{inquiry.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{inquiry.email}</p>
            </div>
            <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold border ${STATUS_COLORS[inquiry.status]}`}>
              {inquiry.status}
            </span>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Inquiry Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-gray-400 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="font-medium text-gray-900">{inquiry.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Phone</p>
              <p className="font-medium text-gray-900">{inquiry.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Preferred Country</p>
              <p className="font-medium text-gray-900">{inquiry.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Study Level</p>
              <p className="font-medium text-gray-900">{inquiry.level}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Submitted</p>
              <p className="font-medium text-gray-900">
                {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mt-5">
            <p className="text-xs text-gray-400 mb-2">Message</p>
            <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm leading-relaxed">
              {inquiry.message}
            </div>
          </div>
        </div>

        {/* Status Update Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Update Status</h2>
          <div className="flex flex-wrap gap-3">
            {(["New", "Contacted", "In Progress", "Closed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={updating || inquiry.status === status}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  inquiry.status === status
                    ? `${STATUS_COLORS[status]} cursor-default`
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                } disabled:opacity-60`}
              >
                {updating && inquiry.status !== status ? "..." : status}
              </button>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete this inquiry. This action cannot be undone.
          </p>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            {deleting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete Inquiry"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
