import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Star, Store, TwitterIcon as TikTok, Twitter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BioData } from "@/lib/types"

// This would typically come from your API or database
const mockBioData: BioData = {
  id: "1",
  name: "John Hu",
  avatar: "/placeholder.svg",
  socialLinks: {
    instagram: "https://instagram.com/johnhu",
    tiktok: "https://tiktok.com/@johnhu",
    linkedin: "https://linkedin.com/in/johnhu",
    twitter: "https://twitter.com/johnhu"
  },
  links: [
    {
      id: "1",
      title: "My Content Calendar",
      description: "This is the exact template I used to go from 0 to 100k followers.",
      url: "#",
      buttonText: "Download My Free Template"
    },
    {
      id: "2",
      title: "Your All-in-One Creator Store",
      description: "Offer your followers 1-tap checkout through your link in bio with Stan",
      url: "#",
      buttonText: "Setup Your Creator Store"
    },
    {
      id: "3",
      title: "Book a 1:1 Coaching Session",
      url: "#",
      price: 999,
      rating: 5.0,
    },
    {
      id: "4",
      title: "Ask Me Anything",
      url: "#",
      price: 199,
    },
    {
      id: "5",
      title: "My Podcast w/ Billionaire Founders",
      url: "#",
    }
  ],
  theme: {
    mode: "light",
    primary: "emerald",
  }
}

export default function BioPage({username}:{username:any}) {
  const { name, avatar, socialLinks, links, theme } = mockBioData

  return (
    <div className={`min-h-screen ${theme.mode === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container max-w-4xl mx-auto p-4 py-8 space-y-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className={`relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-${theme.primary}-500`}>
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className={`text-3xl font-bold text-${theme.primary}-500`}>{name}</h1>
            <div className="flex space-x-4">
              {socialLinks.instagram && (
                <Link href={socialLinks.instagram} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  <Instagram className="w-6 h-6" />
                </Link>
              )}
              {socialLinks.tiktok && (
                <Link href={socialLinks.tiktok} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  <TikTok className="w-6 h-6" />
                </Link>
              )}
              {socialLinks.linkedin && (
                <Link href={socialLinks.linkedin} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  <Linkedin className="w-6 h-6" />
                </Link>
              )}
              {socialLinks.twitter && (
                <Link href={socialLinks.twitter} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  <Twitter className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link:any) => (
              <Card key={link.id} className="overflow-hidden transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {link.icon ? (
                        <Image src={link.icon} alt={link.title} width={24} height={24} />
                      ) : (
                        <Store className={`w-6 h-6 text-${theme.primary}-500`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold">{link.title}</h2>
                      {link.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
                      )}
                      {link.price && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`font-semibold text-${theme.primary}-500`}>${link.price}</span>
                          {link.rating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm">{link.rating}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {link.buttonText && (
                    <Button 
                      className={`w-full mt-4 bg-${theme.primary}-500 hover:bg-${theme.primary}-600 text-white`}
                    >
                      {link.buttonText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

