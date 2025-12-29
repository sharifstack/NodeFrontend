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
  PackageSearch,
  PieChart,
  Settings2,
  ShoppingCart,
  Smartphone,
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
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Sharif",
    email: "sharif@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Node-2501",
      logo: GalleryVerticalEnd,
      plan: "Academy",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Category",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Create-Category",
          url: "create-category",
        },
        {
          title: "Category-List",
          url: "category-list",
        },
      ],
    },
    {
      title: "Sub-Category",
      url: "#",
      icon: PackageSearch,
      isActive: true,
      items: [
        {
          title: "Create-SubCategory",
          url: "create-subcategory",
        },
        {
          title: "SubCategory-List",
          url: "subcategory-list",
        },
      ],
    },

    {
      title: "Brand",
      url: "#",
      icon: Smartphone,
      isActive: true,
      items: [
        {
          title: "Create-Brand",
          url: "create-brand",
        },
        {
          title: "Brand-List",
          url: "brand-list",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
