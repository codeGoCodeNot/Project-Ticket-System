"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuth from "@/features/auth/hooks/use-auth";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { navItems } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import getActivePath from "@/utils/get-active-path";
import { signInPath, signUpPath } from "@/path";

const SidebarComponent = () => {
  const { user, isFetched } = useAuth();
  const path = usePathname();
  const { activeIndex } = getActivePath(
    path,
    navItems.map((item) => item.href),
    [signInPath(), signUpPath()],
  );

  if (!user || !isFetched) {
    return null;
  }

  return user ? (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-10 sm:py-20">
              {navItems.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <SidebarMenuItem key={item.title}>
                    {item.separator && <Separator />}
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive && "bg-muted font-bold hover:bg-muted",
                        )}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ) : null;
};

export default SidebarComponent;
