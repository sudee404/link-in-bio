"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserContextContext } from "@/context/UserContext";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Accounts",
      url: "/accounts",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title: "Profile",
          url: "/accounts",
          icon: Frame,
        },
        {
          title: "Business",
          url: "/accounts/business",
          icon: Frame,
        }
      ]
    },    
  ],
  projects: [
    {
      name: "Bio 1",
      url: "#",
      icon: Frame,
    },
    {
      name: "Bio 2",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Bio 3",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const {user} = React.useContext(UserContextContext)

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
        <NavMain label="Settings" items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
