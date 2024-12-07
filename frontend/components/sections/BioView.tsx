import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Youtube, TwitterIcon as TikTok, Star, TwitterIcon, Linkedin } from 'lucide-react'
import { Button } from "../ui/button";
import LinkCard from "../cards/LinkCard";

export default function BioView({ bio: bio }: { bio: any }) {

  return (
    <div className="container  mx-auto grid-cols-1 grid md:grid-cols-3 items-center justify-center">
      {/* Fixed Left Sidebar */}
      <div className="md:h-screen flex flex-col justify-center items-center py-10">

        <Image
          src={bio?.avatar || "/img/default-avatar.png"}
          alt={bio?.title}
          width={100}
          height={100}
          className=" mb-5 p-0 object-cover rounded-full aspect-square"

        />

        <h1 className="text-3xl font-bold text-center mb-2">{bio?.title}</h1>
        {bio?.description && (
          <p className="text-gray-600 text-center mb-6">{bio?.description}</p>
        )}
        <div className="flex space-x-6">
          {bio?.social_links?.Instagram && (
            <Link href={bio?.social_links?.Instagram} className="text-gray-600 hover:text-gray-900">
              <Instagram className="w-6 h-6" />
            </Link>
          )}
          {bio?.social_links?.TikTok && (
            <Link href={bio?.social_links?.TikTok} className="text-gray-600 hover:text-gray-900">
              <TikTok className="w-6 h-6" />
            </Link>
          )}
          {bio?.social_links?.Youtube && (
            <Link href={bio?.social_links?.Youtube} className="text-gray-600 hover:text-gray-900">
              <Youtube className="w-6 h-6" />
            </Link>
          )}
          {bio?.social_links?.Twitter && (
            <Link href={bio?.social_links?.Twitter} className="text-gray-600 hover:text-gray-900">
              <TwitterIcon className="w-6 h-6" />
            </Link>
          )}
          {bio?.social_links?.LinkedIn && (
            <Link href={bio?.social_links?.LinkedIn} className="text-gray-600 hover:text-gray-900">
              <Linkedin className="w-6 h-6" />
            </Link>
          )}
          {bio?.social_links?.Email && (
            <Link href={bio?.social_links?.Email} className="text-gray-600 hover:text-gray-900">
              <Mail className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable Right Content */}
      <div className="md:h-screen  overflow-y-scroll col-span-2 py-5 no-scrollbar">
        <div className=" flex items-center">
          <div className="mt-5">
            {bio?.links?.length ? <div className="flex flex-wrap gap-5 my-20">
              {bio?.links?.map((link: any) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div> : (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">No Links Found</h1>
                <p className="text-gray-600">
                  There are no links available at the moment.
                </p>
              </div>
            )}
            {/* privacy policy button */}
            <div className="p-4 flex justify-center items-center mb-10">
              <Link href="/privacy-policy" >
                <Button variant="destructive" className="">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

