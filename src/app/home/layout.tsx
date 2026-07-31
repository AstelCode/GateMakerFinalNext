import DashboardSidebar from "@/components/layout/dashbaord/HomeSidebar";
import SearchInput from "@/components/features/explore/SearchInput";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <SearchInput />
        </header>
        <main className="flex-1 px-4 min-w-0 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
