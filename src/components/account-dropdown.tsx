import signOut from "@/features/auth/actions/sign-out";
import { accountPasswordPath, accountProfilePath } from "@/path";

import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import SubmitButton from "./form/submit-button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "../../generated/prisma/client";

type AccountDropdownProps = {
  user: User;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={accountProfilePath()}>
              <LucideUser />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={accountPasswordPath()}>
              <LucideLock />
              <span>Password</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <form action={signOut}>
            <SubmitButton
              variant="ghost"
              label="Sign out"
              icon={<LucideLogOut />}
            />
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountDropdown;
