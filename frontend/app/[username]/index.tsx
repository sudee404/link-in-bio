"use client"
import { BioData } from "@/lib/types"
import BioView from "@/components/sections/BioView"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loader from "@/components/ui/loader"
import { Button } from "@/components/ui/button"

export default function UserPage({ username }: { username: any }) {
  const router = useRouter()
  const { data: bio, isLoading, error } = useQuery({
    queryKey: ["bio", username],
    queryFn: async () => await axios.get<BioData>(`/api/bios/${username}`).then((res) => res.data),
  })

  // If there is an error (e.g., bio not found), redirect to a custom error page or show an error message
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">404</h2>
          <p className="text-lg text-gray-600 my-4">Link In Bio Not Found.</p>
          {/* go home */}
          <Button variant="destructive" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
    )
  }

  return <BioView bio={bio} />
}
