"use client";

import {
  SidebarHeader,
  SidebarContent,
  Sidebar,
} from "@/components/ui/sidebar";
import {
  ArrowRightLeft,
  Bookmark,
  Library,
  Package,
  Puzzle,
  Search,
  Users,
} from "lucide-react";
import { NavButtonGroup } from "../../customs/NavButtonGroup";
import { UserProfile } from "./types";
import { NavUser } from "./NavUser";
import { NavGuest } from "./NavGuest";

export default function DashboardSidebar() {
  const currentUser: UserProfile | null = {
    name: "Nickname",
    role: "superadmin",
    avatar: "https://github.com/shadcn.png",
  };

  const defaultOptions = [
    { name: "All", url: "/home/explore/all", icon: Search },
    { name: "Mods", url: "/home/explore/mods", icon: Puzzle },
    { name: "Packs", url: "/home/explore/packs", icon: Package },
  ];
  const userOptions = [
    { name: "Saved Mods", url: "/home/library/search", icon: Bookmark },
    { name: "Saved Packs", url: "/home/library/mods", icon: Library },
  ];
  const adminOptions = [
    { name: "Manage Mods", url: "/home/admin/mods", icon: Puzzle },
    { name: "Manage Packs", url: "/home/admin/packs", icon: Package },
  ];

  const superadminOptions = [
    { name: "Manage Mods", url: "/home/admin/mods", icon: Puzzle },
    { name: "Manage Packs", url: "/home/admin/packs", icon: Package },
    { name: "Manage Users", url: "/home/admin/users", icon: Users },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex size-4 shrink-0 items-center justify-center">
            <ArrowRightLeft className="size-5 shrink-0 " />
          </div>
          <span className="text-center font-bold truncate group-data-[collapsible=icon]:hidden w-full">
            Mod Switcher
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavButtonGroup name={"Explore"} options={defaultOptions} />
        {currentUser && currentUser.role == "user" && (
          <NavButtonGroup name={"My Library"} options={userOptions} />
        )}
        {currentUser && currentUser.role == "admin" && (
          <NavButtonGroup options={adminOptions} name={"Administration"} />
        )}
        {currentUser && currentUser.role == "superadmin" && (
          <NavButtonGroup options={superadminOptions} name={"Administration"} />
        )}
      </SidebarContent>

      {currentUser ? <NavUser user={currentUser} /> : <NavGuest />}
    </Sidebar>
  );
}
