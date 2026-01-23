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

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { navItems } from "../constants";

const SidebarComponent = () => {
  const { user, isFetched } = useAuth();

  if (!user || !isFetched) {
    return null;
  }

  return user ? (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-10 sm:py-20">
              {navItems.map((item, idx) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {idx < navItems.length - 1 && <DropdownMenuSeparator />}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ) : null;
};

export default SidebarComponent;
