"use client"

import { Fragment, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BioPage from "@/app/[username]/page"
import Link from "next/link"
import UserPage from "@/app/[username]"

export default function PreviewPage({username}:{username:any}) {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    // Here you would typically send a request to your API to publish the changes
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    setIsPublishing(false)
    router.push("/dashboard/bio")
  }

  return (
    <Fragment>
       <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preview</h1>
          <div className="space-x-4">
            <Link href={`/bios/${username}/edit`}>
            <Button variant="outline">
              Edit
            </Button>
            </Link>
            <Button onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <UserPage username={username}/>
        </div>
    </Fragment>
  )
}

