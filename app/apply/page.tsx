import InquiryForm from "@/components/InquiryForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now — UniPath",
  description: "Start your international university journey. Submit your inquiry and our experts will get in touch.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info Panel */}
          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-5 text-sm font-medium">
              🎓 Free Consultation
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Begin Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Study Abroad
              </span>{" "}
              Journey
            </h1>

            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Fill in the form and our expert counselors will contact you within 24 hours with a personalized consultation plan.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: "✓", text: "Free initial consultation with expert counselors" },
                { icon: "✓", text: "Personalized university recommendations" },
                { icon: "✓", text: "Complete application support from start to finish" },
                { icon: "✓", text: "Visa guidance and pre-departure assistance" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-bold">{item.icon}</span>
                  </div>
                  <span className="text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400 mb-4">Trusted by students from</p>
              <div className="flex flex-wrap gap-3">
                {["🇺🇸 USA", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇺 Australia", "🇩🇪 Germany"].map((country) => (
                  <span key={country} className="bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Submit Your Inquiry</h2>
            <p className="text-gray-500 text-sm mb-7">All fields are required. We&apos;ll respond within 24 hours.</p>
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
