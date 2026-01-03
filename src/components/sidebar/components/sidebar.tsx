"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { navItems } from "../constants";
import SidebarItem from "./sidebar-item";
import useAuth from "@/features/auth/hooks/use-auth";

const Sidebar = () => {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user, isFetched } = useAuth();

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  if (!user || !isFetched) {
    return <div className="w-[78px] bg-background/20" />;
  }

  return (
    <>
      <nav
        className={cn(
          "animate-sidebar-from-left",
          "h-screen border-r pt-10",
          isTransition && "duration-200",
          isOpen ? "md:w-50 w-[78px]" : "w-[78px]"
        )}
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={() => handleToggle(false)}
      >
        <div className="px-3 py-2">
          <nav className="space-y-2">
            {navItems.map((navItem) => (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                navItem={navItem}
              />
            ))}
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
