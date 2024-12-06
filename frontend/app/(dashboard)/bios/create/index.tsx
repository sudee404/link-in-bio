"use client";

import { useContext, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { UserContextContext } from "@/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Define Zod Schema

const bioFormSchema = z.object({
  title: z.string().min(1, "Display name is required"),
  description: z.string().optional(),
  avatar: z
    .any().optional(),
  type: z.string().min(1, "Account type is required"),
  social_links: z.record(z.string().optional()),
  links: z.array(
    z.object({
      type: z.string().min(1, "Link type is required"),
      title: z.string().min(1, "Title is required"),
      url: z.string().url("Enter a valid URL"),
      description: z.string().optional(),
      price: z.number().nonnegative().optional(),
      buttonText: z.string().optional(),
    })
  ),
});

type BioFormType = z.infer<typeof bioFormSchema>;

export default function CreateBioPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useContext(UserContextContext)
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BioFormType>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      avatar: "",
      social_links: { Instagram: "", TikTok: "", LinkedIn: "", Twitter: "" },
      links: [{ type: "", title: "", url: "", description: "", price: undefined, buttonText: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const mutation = useMutation({
    mutationFn: async (data: BioFormType) => {
      const response = await axios.post(
        "/api/bios",
        {
          ...data,
          avatar: data?.avatar?.length ? data?.avatar[0] : null,
          user: user?.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // This contains the full data including any extra fields
    },
    onMutate: async (newBio) => {
      // Cancel any outgoing refetches for 'user-profile'
      await queryClient.cancelQueries({ queryKey: ["user-profile"] });
  
      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(["user-profile"]);
  
      // Optimistically update to include the new bio
      queryClient.setQueryData(["user-profile"], (old: any) => {
        if (!old?.user) return old;
        return {
          ...old,
          user: {
            ...old.user,
            bios: [newBio].concat([...(old.user.bios || [])]),
          },
        };
      });
  
      // Return the context for rollback
      return { previousUser };
    },
    onError: (err, newBio, context) => {
      // Rollback to the previous state
      queryClient.setQueryData(["user-profile"], context?.previousUser);
      toast.error("Error creating Link In Bio!");
    },
    onSuccess: (newBio) => {
      // Update the query with the new bio data returned from the server
      queryClient.setQueryData(["user-profile"], (old: any) => {
        if (!old?.user) return old;
        return {
          ...old,
          user: {
            ...old.user,
            bios: [newBio].concat([...(old.user.bios || [])]),
          },
        };
      });
  
      // Redirect to the new bio's page
      if (newBio?.username) {
        router.push(`/bios/${newBio.username}`); // Adjust route as necessary
      }
      toast.success("Link In Bio created successfully!");
    },
    onSettled: () => {
      // Ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const onSubmit = async (data: BioFormType) => {
    setIsSaving(true);
    mutation.mutate(data, {
      onSettled: () => {
        setIsSaving(false);
      },
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Create Link In Bio
      </h1>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Bio Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" placeholder="Enter your display name" {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Display Avatar</Label>
            <Input id="avatar" type="file" placeholder="Enter your display avatar" {...register("avatar")} />
            {errors.avatar && <p className="text-red-500 text-sm">{(String(errors?.avatar?.message))}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select
              value={watch("type")}
              onValueChange={(value) => setValue("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Account Types</SelectLabel>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="pet">Pet</SelectItem>
                  <SelectItem value="brand_ambassador">Brand Ambassador</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="authorized_dealer">Authorized Dealer</SelectItem>
                  <SelectItem value="authorized_retailer">Authorized Retailer</SelectItem>
                  <SelectItem value="authorized_reseller">Authorized Reseller</SelectItem>
                  <SelectItem value="authorized_service_provider">Authorized Service Provider</SelectItem>
                  <SelectItem value="authorized_installer">Authorized Installer</SelectItem>
                  <SelectItem value="certification_organization">Certification Organization</SelectItem>
                  <SelectItem value="third_party_certifier">Third Party Certifier</SelectItem>
                </SelectGroup>

              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell your audience about yourself" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>


        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Instagram", "TikTok", "LinkedIn", "Twitter"].map((platform) => (
            <div key={platform} className="space-y-2">
              <Label>{platform}</Label>
              <Input
                placeholder={`${platform} URL`}
                {...register(`social_links.${platform}`)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bio Links */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Bio Links</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ type: "", title: "", url: "", description: "", price: undefined, buttonText: "" })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((link, index) => (
            <div key={link.id} className="space-y-4 pb-4 border-b last:border-0">
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
                  <Label>Link Type</Label>
                  <Controller
                    control={control}
                    name={`links.${index}.type`}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select link type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="download">Download</SelectItem>
                          <SelectItem value="store">Store</SelectItem>
                          <SelectItem value="booking">Booking</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register(`links.${index}.title`)} placeholder="Enter link title" />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input {...register(`links.${index}.url`)} placeholder="Enter URL" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea {...register(`links.${index}.description`)} placeholder="Enter link description" />
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
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
