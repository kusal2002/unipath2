"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Uni<span className="text-blue-600">Path</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              How It Works
            </Link>
            <Link href="/#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Testimonials
            </Link>
            <Link href="/apply" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Services
              </Link>
              <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Testimonials
              </Link>
              <Link href="/apply" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors text-center" onClick={() => setMenuOpen(false)}>
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
