"use client";

import { ReactNode, ComponentProps } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

type Props = {
  url: string;
  name: string;
  icon: ({ className }: { className?: string }) => ReactNode;
} & ComponentProps<typeof SidebarMenuButton>;

export default function CustomSidebarMenuButton({
  url,
  name,
  icon: Icon,
}: Props) {
  return (
    <SidebarMenuButton tooltip={name}>
      <Link href={url} className="flex items-center gap-3 w-full h-full">
        <Icon className="size-6 shrink-0" />
        <span>{name}</span>
      </Link>
    </SidebarMenuButton>
  );
}
