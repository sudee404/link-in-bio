"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BioPage from "@/app/[username]/page"

export default function PreviewPage() {
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preview</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              Back to Editor
            </Button>
            <Button onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish Changes"}
            </Button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <BioPage />
        </div>
      </div>
    </div>
  )
}

