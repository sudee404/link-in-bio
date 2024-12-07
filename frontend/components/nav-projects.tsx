"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export function NavProjects({
  projects, user
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[], user: any
}) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState('')
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async (username: string) => {
      // Perform the delete request
      const response = await axios.delete(`/api/bios/${username}`);
      return response.data; // Adjust if your API returns any data
    },
    onMutate: async (username) => {
      // Cancel any outgoing refetches for 'user-profile'
      await queryClient.cancelQueries({ queryKey: ["user-profile"] });
  
      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(["user-profile"]);
  
      // Optimistically update to remove the bio
      queryClient.setQueryData(["user-profile"], (old: any) => {
        if (!old?.user) return old;
        return {
          ...old,
          user: {
            ...old.user,
            bios: old.user.bios.filter((bio: any) => bio.username !== username),
          },
        };
      });
  
      // Return the context for rollback
      return { previousUser };
    },
    onError: (err, username, context) => {
      // Rollback to the previous state
      queryClient.setQueryData(["user-profile"], context?.previousUser);
      toast.error("Error deleting Link In Bio!");
    },
    onSuccess: () => {
      // Optionally show a success message
      toast.success("Link In Bio deleted successfully!");
      setOpen('')
    },
    onSettled: () => {
      // Ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
  
  const handleDelete = async () => {
    setDeleting(true);
    deleteMutation.mutate(open, {
      onSettled: () => {
        setDeleting(false);
      },
    });
  };
  

  return (
    <Fragment>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Link in bios</SidebarGroupLabel>
        <SidebarMenu>
          {projects.map((item, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton asChild isActive={pathname === item?.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => router.push(item.url)}>
                    <Folder className="text-muted-foreground" />
                    <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setOpen(item.name)}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete</span>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
          {user?.account_type === 'business' && <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <Link href="/bios/create">Create New</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>}
        </SidebarMenu>
      </SidebarGroup>
      <Dialog open={!!open} onOpenChange={(open) => open ? null : setOpen('')}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Link In Bio</DialogTitle>
            <DialogDescription>
              Click below to remove this link in bio
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleDelete} disabled={deleting}>
              {
                deleting ? 'Deleting...' : 'Delete'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>

  )
}
