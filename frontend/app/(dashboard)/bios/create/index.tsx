"use client";

import { useContext, useState } from "react";
import { useForm, useFieldArray, Controller, FieldError } from "react-hook-form";
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
      price: z.preprocess((value) => value === undefined ? undefined : Number(value), z.number().optional()),
      rating: z.preprocess((value) => value === undefined ? undefined : Number(value), z.number().optional()),
      image: z.any().optional(),
      button_text: z.string().optional(),
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
      links: [{ type: "", title: "", url: "", description: "", price: undefined, rating: undefined, button_text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const mutation = useMutation({
    mutationFn: async (data: BioFormType) => {
      const formData = new FormData();
      // append values,files to formData
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("type", data.type);
      if (data?.avatar?.length) {
        formData.append("avatar", data?.avatar[0]);
      }
      formData.append("social_links", JSON.
        stringify(data.social_links));

      data.links.forEach((link, index) => {
        formData.append(`links[${index}][type]`, link.type);
        formData.append(`links[${index}][title]`, link.title);
        formData.append(`links[${index}][url]`, link.url);

        if (link.description) {
          formData.append(`links[${index}][description]`, link.description);
        }

        if (link.price) {
          formData.append(`links[${index}][price]`, String(link.price));
        }

        if (link.rating) {
          formData.append(`links[${index}][rating]`, String(link.rating));
        }

        if (link.button_text) {
          formData.append(`links[${index}][button_text]`, link.button_text);
        }

        // Handle the image file
        if (link?.image?.length) {
          formData.append(`links[${index}][image]`, link.image[0]);
        }
      });
      formData.append("user", String(user?.id));

      const response = await axios.post(
        "/api/bios",
        formData,
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
          <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bio Links</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ type: "", title: "", url: "", description: "", price: undefined, rating: undefined, button_text: "" })}
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
                  {errors.links?.[index]?.type && (
                    <p className="text-red-500 text-sm">
                      {String((errors.links[index].type as FieldError)?.message || "Invalid input")}
                    </p>
                  )}

                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register(`links.${index}.title`)} placeholder="Enter link title" />
                  {errors.links?.[index]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <Input {...register(`links.${index}.image`)} type="file" placeholder="Enter link image" />
                  {errors.links?.[index]?.image && (
                    <p className="text-red-500 text-sm">
                      {String(errors.links[index].image.message)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input {...register(`links.${index}.url`)} placeholder="Enter URL" />
                  {errors.links?.[index]?.url && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].url.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea {...register(`links.${index}.description`)} placeholder="Enter link description" />
                  {errors.links?.[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].description.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Price (Optional)</Label>
                  <Input {...register(`links.${index}.price`)} type="number" placeholder="Enter Price" />
                  {errors.links?.[index]?.price && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Rating (Optional)</Label>
                  <Input {...register(`links.${index}.rating`)} type="number" placeholder="Enter Rating" />
                  {errors.links?.[index]?.rating && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].rating.message}
                    </p>
                  )}
                </div>
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input {...register(`links.${index}.button_text`)} placeholder="Enter link button text" />
                  {errors.links?.[index]?.button_text && (
                    <p className="text-red-500 text-sm">
                      {errors.links[index].button_text.message}
                    </p>
                  )}
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
