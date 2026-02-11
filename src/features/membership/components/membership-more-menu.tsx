"use client";

import { Button } from "@/components/ui/button";
import { LucideUserCog } from "lucide-react";
import { MembershipRole } from "../../../../generated/prisma/enums";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import updateMembershipRole from "../actions/update-membership-role";

type MembershipMoreMenuProps = {
  userId: string;
  organizationId: string;
  membershipRole: string;
};

const MembershipMoreMenu = ({
  userId,
  organizationId,
  membershipRole,
}: MembershipMoreMenuProps) => {
  const handleUpdateMembershipRole = async (value: string) => {
    const promise = updateMembershipRole({
      userId,
      organizationId,
      membershipRole: value as MembershipRole,
    });

    toast.promise(promise, {
      loading: "Updating membership role...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideUserCog />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={membershipRole}
          onValueChange={handleUpdateMembershipRole}
        >
          <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MEMBER">Member</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembershipMoreMenu;
