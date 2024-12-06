"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../helpers/ThemeToggle";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">LinkFolio</span>
            <h1 className="text-2xl font-bold text-purple-600">LinkFolio</h1>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-gray-900"
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-900 hover:text-purple-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end align-center gap-2">
          <div>
            <ThemeToggle />
          </div>
          <div>
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-900 hover:text-purple-600"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <h1 className="text-2xl font-bold text-purple-600">
                  LinkFolio
                </h1>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
