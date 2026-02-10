"use client";

import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import switchOrganization from "@/features/organization/actions/switch-organization";
import { Fragment, useActionState } from "react";
import Form from "./form/form";
import Spinner from "./spinner";
import { LucideLoader } from "lucide-react";

type OrganizationOption = {
  id: string;
  name: string;
  membershipByUser: {
    isActive: boolean;
    membershipRole: string;
  };
};

type ActiveOrganizationDropdownProps = {
  organizations: OrganizationOption[];
  activeOrganizationId?: string;
  activeOrganizationName?: string;
};

type OrganizationSwitchMenuItemProps = {
  organization: OrganizationOption;
  isActive: boolean;
};

const OrganizationSwitchMenuItem = ({
  organization,
  isActive,
}: OrganizationSwitchMenuItemProps) => {
  const [actionState, action, isPending] = useActionState(
    switchOrganization.bind(null, organization.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <DropdownMenuItem asChild>
      <Form action={action} actionState={actionState}>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-between gap-2"
        >
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm truncate">{organization.name}</span>
            <span className="text-[10px] text-muted-foreground capitalize">
              {organization.membershipByUser.membershipRole.toLowerCase()}
            </span>
          </div>

          <span className="text-[10px] text-muted-foreground">
            {isPending ? (
              <LucideLoader className="animate-spin" />
            ) : isActive ? (
              "Active"
            ) : null}
          </span>
        </button>
      </Form>
    </DropdownMenuItem>
  );
};

const ActiveOrganizationDropdown = ({
  organizations,
  activeOrganizationId,
  activeOrganizationName,
}: ActiveOrganizationDropdownProps) => {
  const hasOrganizations = organizations.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 max-w-[200px] justify-start px-2 text-xs"
        >
          <span className="truncate">
            {activeOrganizationName ??
              (hasOrganizations ? "Choose organization" : "No organizations")}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!hasOrganizations ? (
          <DropdownMenuItem disabled>No organizations yet</DropdownMenuItem>
        ) : (
          organizations.map((organization, index) => (
            <Fragment key={organization.id}>
              <OrganizationSwitchMenuItem
                organization={organization}
                isActive={organization.id === activeOrganizationId}
              />
              {index < organizations.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveOrganizationDropdown;
