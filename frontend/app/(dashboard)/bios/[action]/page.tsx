"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Loader2, Moon, Sun } from 'lucide-react'

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
import { Switch } from "@/components/ui/switch"
import { BioDataSchema, BioData } from "@/lib/types"

type ActionProps = {
  params: {
    action: "create" | "edit"
  }
}

const colorOptions = [
  "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", 
  "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"
]

export default function BioForm({ params: { action } }: ActionProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<BioData>({
    resolver: zodResolver(BioDataSchema),
    defaultValues: {
      theme: {
        mode: "light",
        primary: "emerald",
      },
      ...(action === "edit" ? {
        // Mock data for edit mode
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
        ],
      } : {})
    }
  })

  const watchTheme = watch("theme") ?? { mode: "light", primary: "emerald" }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  })


  const onSubmit = async (data: BioData) => {
    setIsLoading(true)
    // Here you would typically send the data to your API
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    setIsLoading(false)
    router.push("/dashboard/bio")
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{action === "create" ? "Create" : "Edit"} Your Bio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input id="avatar" {...register("avatar")} />
              {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Social Links</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Instagram URL" {...register("socialLinks.instagram")} />
                <Input placeholder="TikTok URL" {...register("socialLinks.tiktok")} />
                <Input placeholder="LinkedIn URL" {...register("socialLinks.linkedin")} />
                <Input placeholder="Twitter URL" {...register("socialLinks.twitter")} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Bio Links</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ id: Date.now().toString(), title: "", url: "" })}>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 pb-4 border-b last:border-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Link {index + 1}</h3>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input {...register(`links.${index}.title`)} />
                    {errors.links?.[index]?.title && <p className="text-red-500 text-sm">{errors.links[index]?.title?.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input {...register(`links.${index}.description`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input {...register(`links.${index}.url`)} />
                    {errors.links?.[index]?.url && <p className="text-red-500 text-sm">{errors.links[index]?.url?.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (optional)</Label>
                      <Input type="number" {...register(`links.${index}.price`, { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input {...register(`links.${index}.buttonText`)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Customization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-mode">Dark Mode</Label>
              <Switch
                id="theme-mode"
                checked={watchTheme.mode === "dark"}
                onCheckedChange={(checked:any) => setValue("theme.mode", checked ? "dark" : "light")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme-primary">Primary Color</Label>
              <Select
                onValueChange={(value:any) => setValue("theme.primary", value)}
                defaultValue={watchTheme.primary}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {action === "create" ? "Create" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

