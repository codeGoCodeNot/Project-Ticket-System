"use client";

import signOut from "@/features/auth/actions/sign-out";
import useAuth from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/path";
import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import SubmitButton from "./form/submit-button";
import ThemeSwitcher from "./theme/theme-switcher";
import { Button } from "./ui/button";

// this is navigation items for layout
const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <form action={signOut}>
      <SubmitButton label="Sign out" icon={<LucideLogOut />} />
    </form>
  ) : (
    <>
      <Button variant="outline" asChild>
        <Link href={signUpPath()}>
          <h1>Sign Up</h1>
        </Link>
      </Button>
      <Button variant="default" asChild>
        <Link href={signInPath()}>
          <h1>Sign In</h1>
        </Link>
      </Button>
    </>
  );

  return (
    <nav
      className="animate-slide-from-top supports-backdrop-blur:bg-background/60
      fixed left-0 right-0 top-0 z-20
      border-b bg-background/95 backdrop-blur
      w-full flex justify-between 
      py-2.5 px-5
      "
    >
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" asChild>
          <Link href={homePath()}>
            <LucideKanban />
            <h1 className="text-lg font-semibold">TicketHub</h1>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export default Header;
