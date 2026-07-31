import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogIn } from "lucide-react";

export function NavGuest() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Sign In" size="lg">
            <a
              href="/signin"
              className="flex items-center gap-2 w-full overflow-hidden"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent/50 text-sidebar-foreground">
                <LogIn className="size-4 shrink-0 " />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Sign In</span>
                <span className="truncate text-xs text-muted-foreground">
                  Accede a tu cuenta
                </span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
