"use client";

import * as React from "react";
import {
  Frame,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserContextContext } from "@/context/UserContext";
import { usePathname } from "next/navigation";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(UserContextContext)
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">LinkFolio</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Settings" items={[{
          title: "Accounts",
          url: "/accounts",
          icon: SquareTerminal,
          isActive: pathname === '/accounts',
          items: user?.account_type === "business" ? [
            {
              title: "Profile",
              url: "/accounts",
            },
            {
              title: "Business",
              url: "/accounts/business",
            }
          ] : [
            {
              title: "Profile",
              url: "/accounts",
            }
          ]
        }]} />
        <NavProjects projects={user?.bios?.map((bio: any) => ({
          name: bio?.username,
          url: `/bios/${bio.username}`,
          icon: Frame,
        })) || []} user={user} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
