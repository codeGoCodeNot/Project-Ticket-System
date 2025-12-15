import { homePath, ticketsPath } from "@/path";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme/theme-switcher";

// this is navigation items for layout
const Header = () => {
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
        <Button variant="default" asChild>
          <Link href={ticketsPath()}>
            <h1>Tickets</h1>
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Header;
