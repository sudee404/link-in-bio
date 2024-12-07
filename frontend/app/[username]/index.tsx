import { BioData } from "@/lib/types"
import BioView from "@/components/sections/BioView"

// This would typically come from your API or database
const mockBioData: BioData = {
  id: "1",
  name: "John Hu",
  avatar: "/img/default-avatar.png",
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
      button_text: "Download My Free Template"
    },
    {
      id: "2",
      title: "Your All-in-One Creator Store",
      description: "Offer your followers 1-tap checkout through your link in bio with Stan",
      url: "#",
      button_text: "Setup Your Creator Store"
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

export default function UserPage({ username }: { username: any }) {

  return (
    <div className={`min-h-screen `}>
      <BioView bio={mockBioData} />
    </div>
  )
}

