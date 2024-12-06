"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 to-pink-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Your Digital Identity in One Simple Link
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Create a beautiful landing page that showcases all your important
            links, social media, and content in one place.
          </p>
          {session ? (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/accounts"
                className="rounded-md bg-purple-600 dark:bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 dark:hover:bg-purple-400 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/accounts/bios"
                className="text-sm font-semibold text-gray-900 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              >
                My Links <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-purple-600 dark:bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 dark:hover:bg-purple-400 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/demo"
                className="text-sm font-semibold text-gray-900 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              >
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
