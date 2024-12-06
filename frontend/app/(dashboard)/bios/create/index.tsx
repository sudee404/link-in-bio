"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { BioLink } from "@/types/bio"

export default function CreateBioPage() {
  const router = useRouter()
  const [links, setLinks] = useState<Partial<BioLink>[]>([{ title: "", url: "" }])

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }])
  }

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const updateLink = (index: number, field: keyof BioLink, value: string | number) => {
    const newLinks = [...links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setLinks(newLinks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/dashboard/bio")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" placeholder="Enter your display name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell your audience about yourself" />
            </div>
            <div className="space-y-2">
              <Label>Social Links</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Instagram URL" />
                <Input placeholder="TikTok URL" />
                <Input placeholder="LinkedIn URL" />
                <Input placeholder="Twitter URL" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Bio Links</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addLink}>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 pb-4 border-b last:border-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Link {index + 1}</h3>
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Link Type</Label>
                    <Select onValueChange={(value) => updateLink(index, "type" as any, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select link type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="download">Download</SelectItem>
                        <SelectItem value="store">Store</SelectItem>
                        <SelectItem value="booking">Booking</SelectItem>
                        <SelectItem value="custom">Custom Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={link.title}
                      onChange={(e) => updateLink(index, "title", e.target.value)}
                      placeholder="Enter link title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={link.description}
                      onChange={(e) => updateLink(index, "description", e.target.value)}
                      placeholder="Enter link description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      placeholder="Enter URL"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (optional)</Label>
                      <Input
                        type="number"
                        value={link.price}
                        onChange={(e) => updateLink(index, "price", Number(e.target.value))}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={link.buttonText}
                        onChange={(e) => updateLink(index, "buttonText", e.target.value)}
                        placeholder="Enter button text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
  )
}

