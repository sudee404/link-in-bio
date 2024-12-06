"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { BioData } from "@/types/bio"

// Import the CreateBioPage component
import CreateBioForm from "../../create/page"

export default function EditBioPage() {
  const router = useRouter()
  const [data, setData] = useState<BioData | null>(null)

  useEffect(() => {
    // Fetch bio data
    const fetchData = async () => {
      // In a real app, fetch from your API
      const mockData: BioData = {
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
          }
        ]
      }
      setData(mockData)
    }

    fetchData()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return <CreateBioForm initialData={data} />
}

