import signOut from "@/features/auth/actions/sign-out";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";
import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import ThemeSwitcher from "./theme/theme-switcher";
import { Button } from "./ui/button";
import getAuth from "@/features/queries/get-auth";

// this is navigation items for layout
const Header = async () => {
  const { session } = await getAuth();

  const navItems = session ? (
    <>
      <Button variant="default" asChild>
        <Link href={ticketsPath()}>
          <h1>Tickets</h1>
        </Link>
      </Button>
      <form action={signOut}>
        <Button variant="outline">
          <h1>Sign Out</h1>
          <LucideLogOut />
        </Button>
      </form>
    </>
  ) : (
    <>
      <Button variant="default" asChild>
        <Link href={ticketsPath()}>
          <h1>Tickets</h1>
        </Link>
      </Button>
      <div className="flex flex-col flex-1 gap-y-1  sm:flex-row sm:gap-x-1 sm:gap-y-0">
        <Button variant="outline" asChild>
          <Link href={signUpPath()}>
            <h1>Sign Up</h1>
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={signInPath()}>
            <h1>Sign In</h1>
          </Link>
        </Button>
      </div>
    </>
  );

  return (
    <nav
      className="
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        flex justify-between 
        py-2.5 px-5 border-b
        w-full
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
