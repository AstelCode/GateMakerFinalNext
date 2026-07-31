/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomSidebarMenuButton from "@/components/customs/CustomSidebarMenuButton";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavButtonGroup({
  options,
  name,
}: {
  name: string;
  options: { name: string; url: string; icon: any }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{name}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {options.map((project) => (
            <SidebarMenuItem key={project.name}>
              <CustomSidebarMenuButton {...project} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
