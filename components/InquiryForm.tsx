"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  country: z.string().min(1, "Please select a preferred country"),
  level: z.enum(["Diploma", "Bachelors", "Masters"], {
    error: "Please select a study level",
  }),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "New Zealand",
  "Ireland",
  "Sweden",
  "Norway",
  "Denmark",
  "Japan",
  "Singapore",
  "UAE",
];

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Thank you for reaching out. Our team will review your application and contact you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Smith"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 focus:border-transparent transition`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 focus:border-transparent transition`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+1 234 567 8900"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.phone ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          } focus:outline-none focus:ring-2 focus:border-transparent transition`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {/* Country & Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Country <span className="text-red-500">*</span>
          </label>
          <select
            {...register("country")}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.country ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 focus:border-transparent transition bg-white`}
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Study Level <span className="text-red-500">*</span>
          </label>
          <select
            {...register("level")}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.level ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 focus:border-transparent transition bg-white`}
          >
            <option value="">Select a level</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
          </select>
          {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Tell Us About Your Goals <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Share your academic background, career goals, and anything else you'd like us to know..."
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          } focus:outline-none focus:ring-2 focus:border-transparent transition resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
