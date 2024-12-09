import Image from "next/image";
import { Star, Download, ShoppingCart, Link as LinkIcon } from "lucide-react";

export default function LinkCard({
  link,
  setSelected,
}: {
  link: any;
  setSelected: any;
}) {
  return (
    <div
      key={link?.id}
      className={`rounded-xl overflow-hidden shadow-md md:w-2/5 h-fit transition-all duration-300 transform hover:scale-105 ${
        link.type === "download"
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
          : link.type === "store"
          ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
          : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white"
      }`}
    >
      <div className="p-5 space-y-4">
        {/* Card Icon */}
        <div className="flex justify-center">
          {link.type === "download" && (
            <Download className="w-12 h-12 text-white bg-blue-900 rounded-full p-2 shadow-lg" />
          )}
          {link.type === "store" && (
            <ShoppingCart className="w-12 h-12 text-white bg-green-900 rounded-full p-2 shadow-lg" />
          )}
          {link.type === "custom" && (
            <LinkIcon className="w-12 h-12 text-white bg-gray-700 rounded-full p-2 shadow-lg" />
          )}
        </div>

        {/* Image */}
        {link?.image && (
          <div className="flex justify-center">
            <Image
              src={link?.image || "/img/handshake.svg"}
              alt={link?.title}
              width={100}
              height={100}
              className="object-cover aspect-square rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="text-center">
          <h2
            className={`font-bold text-xl ${
              link.type === "download" || link.type === "store"
                ? "text-white"
                : "text-black dark:text-white"
            }`}
          >
            {link?.title}
          </h2>
          {link?.description && (
            <p
              className={`text-sm ${
                link.type === "download" || link.type === "store"
                  ? "text-white/90"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {link?.description}
            </p>
          )}
        </div>

        {/* Price & Rating */}
        {(link?.price || link?.rating) && (
          <div className="flex justify-center items-center gap-4">
            {link?.price && (
              <span
                className={`font-bold ${
                  link.type === "download" || link.type === "store"
                    ? "text-yellow-300"
                    : "text-red-600"
                }`}
              >
                ${link?.price}
              </span>
            )}
            {link?.rating && (
              <div className="flex items-center">
                <Star
                  className={`w-4 h-4 ${
                    link.type === "download" || link.type === "store"
                      ? "text-yellow-300 fill-yellow-300"
                      : "text-yellow-400 fill-yellow-400"
                  }`}
                />
                <span className="ml-1 text-sm">{link?.rating}</span>
              </div>
            )}
          </div>
        )}

        {/* Button */}
        <button
          className={`w-full py-2 rounded-md font-bold shadow-lg transition-all duration-300 ${
            link.type === "download"
              ? "bg-white text-blue-700 hover:bg-blue-200"
              : link.type === "store"
              ? "bg-white text-green-700 hover:bg-green-200"
              : "bg-green-600 text-black hover:bg-green-700"
          }`}
          onClick={() => {
            setSelected(link);
          }}
        >
          {link?.button_text || "Select"}
        </button>
      </div>
    </div>
  );
}
