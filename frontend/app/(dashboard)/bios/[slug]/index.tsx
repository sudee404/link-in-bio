"use client"

import { Fragment, useContext, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import BioView from "@/components/sections/BioView"
import { UserContextContext } from "@/context/UserContext"
import axios from "axios"
import { toast } from "react-toastify"

export default function PreviewPage({ username }: { username: any }) {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const { user } = useContext(UserContextContext)

  const bio = useMemo(() => user?.bios?.find((bio) => bio.username === username), [username, user?.bios])

  const handlePublish = async () => {
    setIsPublishing(true)
    // Here you would typically send a request to your API to publish the changes
    await axios.patch(`/api/bios/${username}`, { published: true }).then((res) => {
      toast.success("Bio published successfully")
      router.push(`/${username}`)

    }).catch((err) => {
      toast.error("Error publishing bio")
      console.log(err)
    }).finally(() => {
      setIsPublishing(false)
    })
  }

  return (
    <Fragment>

      {bio ? <Fragment>
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
          <BioView bio={bio} />
        </div>
      </Fragment> : <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center text-red-600 py-32 font-bold text-2xl">
        Bio Not Found
      </div>}
    </Fragment>
  )
}

