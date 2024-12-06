import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { BioData } from "@/types/bio"

// Import the CreateBioPage component
import EditBioPage from "."

export default async function Home({ params }: { params: any }) {
  const { slug } = await params
  return <EditBioPage username={slug}/>
}

