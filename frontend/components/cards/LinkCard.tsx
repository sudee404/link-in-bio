import Image from "next/image"
import { Star } from 'lucide-react'
export default function LinkCard({ link }: { link: any }) {
    return (
        <div key={link?.id} className="rounded-xl overflow-hidden bg-slate-200 dark:bg-black shadow-md md:w-2/5 h-fit hover:shadow-lg transition-all duration-300">
            <div className="p-3">
                <div className="flex gap-4">
                    {link?.image ? <div className="">
                        <Image
                            src={link?.image || "/img/handshake.svg"}
                            alt={link?.title}
                            width={80}
                            height={80}
                            className="object-cover aspect-square rounded-lg shadow-md"
                        />
                    </div> : null}
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg">{link?.title}</h2>
                        {link?.description && (
                            <p className="text-gray-600 text-sm mb-2">{link?.description}</p>
                        )}
                        {(link?.price || link?.rating) && (
                            <div className="flex items-center gap-2">
                                {link?.price && <span className="font-bold text-red-600">${link?.price}</span>}
                                {link?.rating && (
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="ml-1 text-sm">{link?.rating}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-md transition duration-300">
                    {link?.button_text}
                </button>
            </div>
        </div>
    );
}