import Link from "next/link";
import { X, ArrowRight, Download, ShoppingCart, Link as LinkIcon } from "lucide-react";

export default function LinkDetail({ link, setSelected }: any) {
  return (
    <div className="relative py-32 w-full">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Dismiss Button */}
      <button
        className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
        onClick={() => setSelected("")}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Type-Specific Icon */}
          <div className="flex justify-center">
            {link.type === "download" && (
              <Download className="w-16 h-16 text-blue-500 bg-blue-200 rounded-full p-4 shadow-lg" />
            )}
            {link.type === "store" && (
              <ShoppingCart className="w-16 h-16 text-green-500 bg-green-200 rounded-full p-4 shadow-lg" />
            )}
            {link.type === "custom" && (
              <LinkIcon className="w-16 h-16 text-gray-600 bg-gray-200 rounded-full p-4 shadow-lg" />
            )}
          </div>

          {/* Title */}
          <h2
            className={`text-4xl md:text-5xl font-bold ${
              link.type === "download"
                ? "bg-gradient-to-r from-blue-500 to-blue-700"
                : link.type === "store"
                ? "bg-gradient-to-r from-green-500 to-green-700"
                : "bg-gradient-to-r from-gray-600 to-gray-800"
            } inline-block text-transparent bg-clip-text`}
          >
            {link?.title || "Link Details"}
          </h2>

          {/* Description */}
          {link?.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {link.description}
            </p>
          )}

          {/* Type-Specific Content */}
          {link.type === "download" && (
            <p className="text-blue-600 font-medium">
              This link allows you to download resources quickly and securely.
            </p>
          )}
          {link.type === "store" && (
            <p className="text-green-600 font-medium">
              Check out this store link to purchase high-quality items.
            </p>
          )}
          {link.type === "custom" && (
            <p className="text-gray-600 font-medium">
              This is a custom link, leading to a unique destination.
            </p>
          )}

          {/* Price and Rating */}
          {(link?.price || link?.rating) && (
            <div className="flex justify-center items-center gap-4">
              {link?.price && (
                <span
                  className={`font-bold text-xl ${
                    link.type === "download"
                      ? "text-blue-500"
                      : link.type === "store"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  ${link.price}
                </span>
              )}
              {link?.rating && (
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27l5.18 3.73-1.64-7.03L20 8.91l-7.19-.61L12 2 9.19 8.3 2 8.91l5.46 5.06L5.82 21z"
                    />
                  </svg>
                  <span className="ml-1 text-sm">{link.rating}</span>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={link?.url || "#"}
              className={`inline-flex items-center px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${
                link.type === "download"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : link.type === "store"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Visit Link
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              onClick={() => setSelected("")}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
